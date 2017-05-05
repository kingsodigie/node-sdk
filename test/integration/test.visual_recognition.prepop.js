'use strict';
const fs = require('fs');
const nock = require('nock');
const watson = require('../../index');
const assert = require('assert');
const path = require('path');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

const THIRTY_SECONDS = 30000;
const TWO_SECONDS = 2000;

const logit = function(string) {
  // console.log('==> ' + string);
  return string;
};

describe('visual_recognition_integration_prepopulated', function() {
  // ugh.
  this.timeout(THIRTY_SECONDS * 8);
  this.slow(TWO_SECONDS);
  this.retries(5);

  let visual_recognition;
  let classifier_id;

  const test_training_status = function(resolve, reject) {
    //  This evil recursive function will be used to verify that the classifier
    //  has finished training. 'resolve' and 'reject' are functions from an
    //  enclosing promise (or a follow-on callback for resolve if you prefer)
    visual_recognition.getClassifier({ classifier_id: classifier_id }, function(err, response) {
      if (err) {
        reject(err);
        return;
      }
      if (response.status === 'failed') {
        reject(new Error(response.explanation));
        return;
      }
      if (response.status !== 'ready') {
        logit(JSON.stringify(response));
        logit('Classifier ' + classifier_id + ' status is "' + response.status + '".  Waiting 10 seconds.');
        setTimeout(test_training_status, 10 * 1000, resolve, reject); // wait 10 seconds and try again
      } else {
        logit('Classifier ' + classifier_id + ' is ready.');
        resolve();
      }
    });
  };

  before(function() {
    //  NOTE: Use a separate auth configuration item to prevent overwrite
    //        in the 'test.visual_recognition.js' set of tests.
    visual_recognition = watson.visual_recognition(auth.visual_recognition_prepop.v3);
    nock.enableNetConnect();

    //  WOW.  I never thought I'd have to learn Promises just to write a test prep.  -JPS
    return new Promise(function(resolve, reject) {
      visual_recognition.listClassifiers({}, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        const classifier_name = 'visual_recognition_test_prepop';
        const c = result.classifiers.find(element => element.name === classifier_name);

        if (c === undefined) {
          logit('Classifier not found, creating new classifier...');
          const p = path.join(__dirname, '../resources/visual_recognition.prepop');
          visual_recognition.createClassifier(
            {
              name: 'visual_recognition_test_prepop',
              beach_positive_examples: fs.createReadStream(path.join(p, 'beach.zip')),
              forest_positive_examples: fs.createReadStream(path.join(p, 'forest.zip')),
              still_positive_examples: fs.createReadStream(path.join(p, 'still.zip')),
              water_positive_examples: fs.createReadStream(path.join(p, 'water.zip'))
            },
            function(err, response) {
              if (err) {
                reject(err);
                return;
              }
              logit('Created classifier with ID="' + response.classifier_id + '"');
              logit(JSON.stringify(response));
              resolve(response.classifier_id);
            }
          );
        } else {
          logit('Classifier ' + classifier_name + ' found with ID=' + c.classifier_id);
          resolve(c.classifier_id);
        }
      });
    }).then(c => {
      classifier_id = c;
    });
  });

  after(function() {
    nock.disableNetConnect();
  });

  beforeEach(function() {
    return new Promise(test_training_status);
  });

  it('should classify an uploaded image ', function() {
    return new Promise(function(resolve, reject) {
      logit('Classifing with classifier_id = ' + classifier_id);
      const params = {
        images_file: fs.createReadStream(__dirname + '/../resources/183px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'),
        classifier_ids: [classifier_id],
        threshold: '0.0'
      };
      visual_recognition.classify(params, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        logit(JSON.stringify(result, null, 2));
        assert.equal(result.images_processed, 1);
        assert.equal(result.images[0].image, '183px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg');
        assert.equal(result.images[0].classifiers.length, 1);
        assert.equal(result.images[0].classifiers[0].classifier_id, classifier_id);
        assert(
          result.images[0].classifiers[0].classes.every(function(cl) {
            if (cl.class === 'beach' || cl.class === 'water' || cl.class === 'still' || cl.class === 'forest') {
              return true;
            } else {
              logit('Rogue class ' + cl.class + ' found.');
              return false;
            }
          })
        );
        resolve();
      });
    });
  });

  it('should come back empty when nothing passes the classification threshold ', function() {
    return new Promise(function(resolve, reject) {
      logit('Classifing with classifier_id = ' + classifier_id);
      const params = {
        images_file: fs.createReadStream(__dirname + '/../resources/183px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'),
        classifier_ids: [classifier_id],
        threshold: '0.9'
      };
      visual_recognition.classify(params, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        logit(JSON.stringify(result, null, 2));
        assert.equal(result.images_processed, 1);
        assert.equal(result.images[0].image, '183px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg');
        assert.equal(result.images[0].classifiers.length, 0);
        assert(result.custom_classes > 0);
        resolve();
      });
    });
  });
}); // vr