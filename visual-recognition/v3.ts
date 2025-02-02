/**
 * (C) Copyright IBM Corp. 2017, 2019.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { BaseService, FileObject, getMissingParams } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM Watson&trade; Visual Recognition service uses deep learning algorithms to identify scenes, objects, and faces  in images you upload to the service. You can create and train a custom classifier to identify subjects that suit your needs.
 */

class VisualRecognitionV3 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/visual-recognition/api';
  name: string; // set by prototype to 'watson_vision_combined'
  serviceVersion: string; // set by prototype to 'v3'

  /**
   * Construct a VisualRecognitionV3 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/visual-recognition/api'). The base url may differ between IBM Cloud regions.
   * @param {string} [options.iam_access_token] - An IAM access token fully managed by the application. Responsibility falls on the application to refresh the token, either before it expires or reactively upon receiving a 401 from the service, as any requests made with an expired token will fail.
   * @param {string} [options.iam_apikey] - An API key that can be used to request IAM tokens. If this API key is provided, the SDK will manage the token and handle the refreshing.
   * @param {string} [options.iam_url] - An optional URL for the IAM service API. Defaults to 'https://iam.cloud.ibm.com/identity/token'.
   * @param {string} [options.iam_client_id] - client id (username) for request to iam service
   * @param {string} [options.iam_client_secret] - client secret (password) for request to iam service
   * @param {string} [options.icp4d_access_token] - icp for data access token provided and managed by user
   * @param {string} [options.icp4d_url] - icp for data base url - used for authentication
   * @param {string} [options.authentication_type] - authentication pattern to be used. can be iam, basic, or icp4d
   * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This
   * option may be useful for requests that are proxied.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By
   * default, all IBM Watson services log requests and their results. Logging is done only to improve the services for
   * future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of
   * users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {VisualRecognitionV3}
   * @throws {Error}
   */
  constructor(options: VisualRecognitionV3.Options) {
    super(options);
    // check if 'version' was provided
    if (typeof this._options.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this._options.qs.version = options.version;
  }

  /*************************
   * general
   ************************/

  /**
   * Classify images.
   *
   * Classify images with built-in or custom classifiers.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} [params.images_file] - An image file (.gif, .jpg, .png, .tif) or
   * .zip file with images. Maximum image size is 10 MB. Include no more than 20 images and limit the .zip file to 100
   * MB. Encode the image and .zip file names in UTF-8 if they contain non-ASCII characters. The service assumes UTF-8
   * encoding if it encounters non-ASCII characters.
   *
   * You can also include an image with the **url** parameter.
   * @param {string} [params.images_filename] - The filename for images_file.
   * @param {string} [params.images_file_content_type] - The content type of images_file.
   * @param {string} [params.url] - The URL of an image (.gif, .jpg, .png, .tif) to analyze. The minimum recommended
   * pixel density is 32X32 pixels, but the service tends to perform better with images that are at least 224 x 224
   * pixels. The maximum image size is 10 MB.
   *
   * You can also include images with the **images_file** parameter.
   * @param {number} [params.threshold] - The minimum score a class must have to be displayed in the response. Set the
   * threshold to `0.0` to return all identified classes.
   * @param {string[]} [params.owners] - The categories of classifiers to apply. The **classifier_ids** parameter
   * overrides **owners**, so make sure that **classifier_ids** is empty.
   * - Use `IBM` to classify against the `default` general classifier. You get the same result if both
   * **classifier_ids** and **owners** parameters are empty.
   * - Use `me` to classify against all your custom classifiers. However, for better performance use **classifier_ids**
   * to specify the specific custom classifiers to apply.
   * - Use both `IBM` and `me` to analyze the image against both classifier categories.
   * @param {string[]} [params.classifier_ids] - Which classifiers to apply. Overrides the **owners** parameter. You can
   * specify both custom and built-in classifier IDs. The built-in `default` classifier is used if both
   * **classifier_ids** and **owners** parameters are empty.
   *
   * The following built-in classifier IDs require no training:
   * - `default`: Returns classes from thousands of general tags.
   * - `food`: Enhances specificity and accuracy for images of food items.
   * - `explicit`: Evaluates whether the image might be pornographic.
   * @param {string} [params.accept_language] - The desired language of parts of the response. See the response for
   * details.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public classify(params?: VisualRecognitionV3.ClassifyParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.ClassifiedImages>): Promise<any> | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.classify(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }
    const formData = {
      'images_file': {
        data: _params.images_file,
        filename: _params.images_filename,
        contentType: _params.images_file_content_type
      },
      'url': _params.url,
      'threshold': _params.threshold,
      'owners': _params.owners,
      'classifier_ids': _params.classifier_ids
    };

    const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v3', 'classify');

    const parameters = {
      options: {
        url: '/v3/classify',
        method: 'POST',
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Accept-Language': _params.accept_language
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * face
   ************************/

  /**
   * Detect faces in images.
   *
   * **Important:** On April 2, 2018, the identity information in the response to calls to the Face model was removed.
   * The identity information refers to the `name` of the person, `score`, and `type_hierarchy` knowledge graph. For
   * details about the enhanced Face model, see the [Release
   * notes](https://cloud.ibm.com/docs/services/visual-recognition?topic=visual-recognition-release-notes#2april2018).
   *
   * Analyze and get data about faces in images. Responses can include estimated age and gender. This feature uses a
   * built-in model, so no training is necessary. The **Detect faces** method does not support general biometric facial
   * recognition.
   *
   * Supported image formats include .gif, .jpg, .png, and .tif. The maximum image size is 10 MB. The minimum
   * recommended pixel density is 32X32 pixels, but the service tends to perform better with images that are at least
   * 224 x 224 pixels.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} [params.images_file] - An image file (gif, .jpg, .png, .tif.) or
   * .zip file with images. Limit the .zip file to 100 MB. You can include a maximum of 15 images in a request.
   *
   * Encode the image and .zip file names in UTF-8 if they contain non-ASCII characters. The service assumes UTF-8
   * encoding if it encounters non-ASCII characters.
   *
   * You can also include an image with the **url** parameter.
   * @param {string} [params.images_filename] - The filename for images_file.
   * @param {string} [params.images_file_content_type] - The content type of images_file.
   * @param {string} [params.url] - The URL of an image to analyze. Must be in .gif, .jpg, .png, or .tif format. The
   * minimum recommended pixel density is 32X32 pixels, but the service tends to perform better with images that are at
   * least 224 x 224 pixels. The maximum image size is 10 MB. Redirects are followed, so you can use a shortened URL.
   *
   * You can also include images with the **images_file** parameter.
   * @param {string} [params.accept_language] - The desired language of parts of the response. See the response for
   * details.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public detectFaces(params?: VisualRecognitionV3.DetectFacesParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.DetectedFaces>): Promise<any> | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.detectFaces(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }
    const formData = {
      'images_file': {
        data: _params.images_file,
        filename: _params.images_filename,
        contentType: _params.images_file_content_type
      },
      'url': _params.url
    };

    const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v3', 'detectFaces');

    const parameters = {
      options: {
        url: '/v3/detect_faces',
        method: 'POST',
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Accept-Language': _params.accept_language
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * custom
   ************************/

  /**
   * Create a classifier.
   *
   * Train a new multi-faceted classifier on the uploaded image data. Create your custom classifier with positive or
   * negative examples. Include at least two sets of examples, either two positive example files or one positive and one
   * negative file. You can upload a maximum of 256 MB per call.
   *
   * Encode all names in UTF-8 if they contain non-ASCII characters (.zip and image file names, and classifier and class
   * names). The service assumes UTF-8 encoding if it encounters non-ASCII characters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the new classifier. Encode special characters in UTF-8.
   * @param {Record<string, NodeJS.ReadableStream|FileObject|Buffer>} params.positive_examples - A dictionary that
   * contains the value for each classname. The value is a .zip file of images that depict the visual subject of a class
   * in the new classifier. You can include more than one positive example file in a call.
   *
   * Specify the parameter name by appending `_positive_examples` to the class name. For example,
   * `goldenretriever_positive_examples` creates the class **goldenretriever**.
   *
   * Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The
   * maximum number of images is 10,000 images or 100 MB per .zip file.
   *
   * Encode special characters in the file name in UTF-8.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} [params.negative_examples] - A .zip file of images that do not
   * depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
   *
   * Encode special characters in the file name in UTF-8.
   * @param {string} [params.negative_examples_filename] - The filename for negative_examples.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createClassifier(params: VisualRecognitionV3.CreateClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['name', 'positive_examples'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createClassifier(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      'name': _params.name,
      'negative_examples': {
        data: _params.negative_examples,
        filename: _params.negative_examples_filename,
        contentType: 'application/octet-stream'
      }
    };

    Object.keys(_params.positive_examples || {}).forEach(key => {
      const partName = `${key}_positive_examples`
      formData[partName] = {
        data: _params.positive_examples[key],
        contentType: 'application/octet-stream',
      };
    });

    const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v3', 'createClassifier');

    const parameters = {
      options: {
        url: '/v3/classifiers',
        method: 'POST',
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Retrieve a list of classifiers.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.verbose] - Specify `true` to return details about the classifiers. Omit this parameter to
   * return a brief list of classifiers.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listClassifiers(params?: VisualRecognitionV3.ListClassifiersParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifiers>): Promise<any> | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listClassifiers(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const query = {
      'verbose': _params.verbose
    };

    const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v3', 'listClassifiers');

    const parameters = {
      options: {
        url: '/v3/classifiers',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Retrieve classifier details.
   *
   * Retrieve information about a custom classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getClassifier(params: VisualRecognitionV3.GetClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['classifier_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getClassifier(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'classifier_id': _params.classifier_id
    };

    const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v3', 'getClassifier');

    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Update a classifier.
   *
   * Update a custom classifier by adding new positive or negative classes or by adding new images to existing classes.
   * You must supply at least one set of positive or negative examples. For details, see [Updating custom
   * classifiers](https://cloud.ibm.com/docs/services/visual-recognition?topic=visual-recognition-customizing#updating-custom-classifiers).
   *
   * Encode all names in UTF-8 if they contain non-ASCII characters (.zip and image file names, and classifier and class
   * names). The service assumes UTF-8 encoding if it encounters non-ASCII characters.
   *
   * **Tip:** Don't make retraining calls on a classifier until the status is ready. When you submit retraining requests
   * in parallel, the last request overwrites the previous requests. The retrained property shows the last time the
   * classifier retraining finished.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {Record<string, NodeJS.ReadableStream|FileObject|Buffer>} [params.positive_examples] - A dictionary that
   * contains the value for each classname. The value is a .zip file of images that depict the visual subject of a class
   * in the classifier. The positive examples create or update classes in the classifier. You can include more than one
   * positive example file in a call.
   *
   * Specify the parameter name by appending `_positive_examples` to the class name. For example,
   * `goldenretriever_positive_examples` creates the class `goldenretriever`.
   *
   * Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The
   * maximum number of images is 10,000 images or 100 MB per .zip file.
   *
   * Encode special characters in the file name in UTF-8.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} [params.negative_examples] - A .zip file of images that do not
   * depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
   *
   * Encode special characters in the file name in UTF-8.
   * @param {string} [params.negative_examples_filename] - The filename for negative_examples.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateClassifier(params: VisualRecognitionV3.UpdateClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['classifier_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.updateClassifier(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      'negative_examples': {
        data: _params.negative_examples,
        filename: _params.negative_examples_filename,
        contentType: 'application/octet-stream'
      }
    };

    Object.keys(_params.positive_examples || {}).forEach(key => {
      const partName = `${key}_positive_examples`
      formData[partName] = {
        data: _params.positive_examples[key],
        contentType: 'application/octet-stream',
      };
    });

    const path = {
      'classifier_id': _params.classifier_id
    };

    const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v3', 'updateClassifier');

    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}',
        method: 'POST',
        path,
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Delete a classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteClassifier(params: VisualRecognitionV3.DeleteClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['classifier_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteClassifier(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'classifier_id': _params.classifier_id
    };

    const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v3', 'deleteClassifier');

    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * coreML
   ************************/

  /**
   * Retrieve a Core ML model of a classifier.
   *
   * Download a Core ML model file (.mlmodel) of a custom classifier that returns <tt>\"core_ml_enabled\": true</tt> in
   * the classifier details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getCoreMlModel(params: VisualRecognitionV3.GetCoreMlModelParams, callback?: VisualRecognitionV3.Callback<NodeJS.ReadableStream|FileObject|Buffer>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['classifier_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getCoreMlModel(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'classifier_id': _params.classifier_id
    };

    const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v3', 'getCoreMlModel');

    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}/core_ml_model',
        method: 'GET',
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/octet-stream',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * userData
   ************************/

  /**
   * Delete labeled data.
   *
   * Deletes all data associated with a specified customer ID. The method has no effect if no data is associated with
   * the customer ID.
   *
   * You associate a customer ID with data by passing the `X-Watson-Metadata` header with a request that passes data.
   * For more information about personal data and customer IDs, see [Information
   * security](https://cloud.ibm.com/docs/services/visual-recognition?topic=visual-recognition-information-security).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customer_id - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteUserData(params: VisualRecognitionV3.DeleteUserDataParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['customer_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteUserData(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const query = {
      'customer_id': _params.customer_id
    };

    const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v3', 'deleteUserData');

    const parameters = {
      options: {
        url: '/v3/user_data',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

}

VisualRecognitionV3.prototype.name = 'watson_vision_combined';
VisualRecognitionV3.prototype.serviceVersion = 'v3';

/*************************
 * interfaces
 ************************/

namespace VisualRecognitionV3 {

  /** Options for the `VisualRecognitionV3` constructor. */
  export type Options = {
    version: string;
    url?: string;
    iam_access_token?: string;
    iam_apikey?: string;
    iam_url?: string;
    iam_client_id?: string;
    iam_client_secret?: string;
    icp4d_access_token?: string;
    icp4d_url?: string;
    username?: string;
    password?: string;
    token?: string;
    authentication_type?: string;
    disable_ssl_verification?: boolean;
    use_unauthenticated?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  export interface Response<T = any>  {
    result: T;
    data: T; // for compatibility
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, body?: T, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `classify` operation. */
  export interface ClassifyParams {
    /** An image file (.gif, .jpg, .png, .tif) or .zip file with images. Maximum image size is 10 MB. Include no more than 20 images and limit the .zip file to 100 MB. Encode the image and .zip file names in UTF-8 if they contain non-ASCII characters. The service assumes UTF-8 encoding if it encounters non-ASCII characters. You can also include an image with the **url** parameter. */
    images_file?: NodeJS.ReadableStream|FileObject|Buffer;
    /** The filename for images_file. */
    images_filename?: string;
    /** The content type of images_file. */
    images_file_content_type?: string;
    /** The URL of an image (.gif, .jpg, .png, .tif) to analyze. The minimum recommended pixel density is 32X32 pixels, but the service tends to perform better with images that are at least 224 x 224 pixels. The maximum image size is 10 MB. You can also include images with the **images_file** parameter. */
    url?: string;
    /** The minimum score a class must have to be displayed in the response. Set the threshold to `0.0` to return all identified classes. */
    threshold?: number;
    /** The categories of classifiers to apply. The **classifier_ids** parameter overrides **owners**, so make sure that **classifier_ids** is empty. - Use `IBM` to classify against the `default` general classifier. You get the same result if both **classifier_ids** and **owners** parameters are empty. - Use `me` to classify against all your custom classifiers. However, for better performance use **classifier_ids** to specify the specific custom classifiers to apply. - Use both `IBM` and `me` to analyze the image against both classifier categories. */
    owners?: string[];
    /** Which classifiers to apply. Overrides the **owners** parameter. You can specify both custom and built-in classifier IDs. The built-in `default` classifier is used if both **classifier_ids** and **owners** parameters are empty. The following built-in classifier IDs require no training: - `default`: Returns classes from thousands of general tags. - `food`: Enhances specificity and accuracy for images of food items. - `explicit`: Evaluates whether the image might be pornographic. */
    classifier_ids?: string[];
    /** The desired language of parts of the response. See the response for details. */
    accept_language?: ClassifyConstants.AcceptLanguage | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `classify` operation. */
  export namespace ClassifyConstants {
    /** The desired language of parts of the response. See the response for details. */
    export enum AcceptLanguage {
      EN = 'en',
      AR = 'ar',
      DE = 'de',
      ES = 'es',
      FR = 'fr',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
      PT_BR = 'pt-br',
      ZH_CN = 'zh-cn',
      ZH_TW = 'zh-tw',
    }
  }

  /** Parameters for the `detectFaces` operation. */
  export interface DetectFacesParams {
    /** An image file (gif, .jpg, .png, .tif.) or .zip file with images. Limit the .zip file to 100 MB. You can include a maximum of 15 images in a request. Encode the image and .zip file names in UTF-8 if they contain non-ASCII characters. The service assumes UTF-8 encoding if it encounters non-ASCII characters. You can also include an image with the **url** parameter. */
    images_file?: NodeJS.ReadableStream|FileObject|Buffer;
    /** The filename for images_file. */
    images_filename?: string;
    /** The content type of images_file. */
    images_file_content_type?: string;
    /** The URL of an image to analyze. Must be in .gif, .jpg, .png, or .tif format. The minimum recommended pixel density is 32X32 pixels, but the service tends to perform better with images that are at least 224 x 224 pixels. The maximum image size is 10 MB. Redirects are followed, so you can use a shortened URL. You can also include images with the **images_file** parameter. */
    url?: string;
    /** The desired language of parts of the response. See the response for details. */
    accept_language?: DetectFacesConstants.AcceptLanguage | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `detectFaces` operation. */
  export namespace DetectFacesConstants {
    /** The desired language of parts of the response. See the response for details. */
    export enum AcceptLanguage {
      EN = 'en',
      AR = 'ar',
      DE = 'de',
      ES = 'es',
      FR = 'fr',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
      PT_BR = 'pt-br',
      ZH_CN = 'zh-cn',
      ZH_TW = 'zh-tw',
    }
  }

  /** Parameters for the `createClassifier` operation. */
  export interface CreateClassifierParams {
    /** The name of the new classifier. Encode special characters in UTF-8. */
    name: string;
    /** A dictionary that contains the value for each classname. The value is a .zip file of images that depict the visual subject of a class in the new classifier. You can include more than one positive example file in a call. Specify the parameter name by appending `_positive_examples` to the class name. For example, `goldenretriever_positive_examples` creates the class **goldenretriever**. Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The maximum number of images is 10,000 images or 100 MB per .zip file. Encode special characters in the file name in UTF-8. */
    positive_examples: Record<string, NodeJS.ReadableStream|FileObject|Buffer>;
    /** A .zip file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images. Encode special characters in the file name in UTF-8. */
    negative_examples?: NodeJS.ReadableStream|FileObject|Buffer;
    /** The filename for negative_examples. */
    negative_examples_filename?: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listClassifiers` operation. */
  export interface ListClassifiersParams {
    /** Specify `true` to return details about the classifiers. Omit this parameter to return a brief list of classifiers. */
    verbose?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `getClassifier` operation. */
  export interface GetClassifierParams {
    /** The ID of the classifier. */
    classifier_id: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `updateClassifier` operation. */
  export interface UpdateClassifierParams {
    /** The ID of the classifier. */
    classifier_id: string;
    /** A dictionary that contains the value for each classname. The value is a .zip file of images that depict the visual subject of a class in the classifier. The positive examples create or update classes in the classifier. You can include more than one positive example file in a call. Specify the parameter name by appending `_positive_examples` to the class name. For example, `goldenretriever_positive_examples` creates the class `goldenretriever`. Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The maximum number of images is 10,000 images or 100 MB per .zip file. Encode special characters in the file name in UTF-8. */
    positive_examples?: Record<string, NodeJS.ReadableStream|FileObject|Buffer>;
    /** A .zip file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images. Encode special characters in the file name in UTF-8. */
    negative_examples?: NodeJS.ReadableStream|FileObject|Buffer;
    /** The filename for negative_examples. */
    negative_examples_filename?: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteClassifier` operation. */
  export interface DeleteClassifierParams {
    /** The ID of the classifier. */
    classifier_id: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `getCoreMlModel` operation. */
  export interface GetCoreMlModelParams {
    /** The ID of the classifier. */
    classifier_id: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customer_id: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /*************************
   * model interfaces
   ************************/

  /** A category within a classifier. */
  export interface Class {
    /** The name of the class. */
    class_name: string;
  }

  /** Result of a class within a classifier. */
  export interface ClassResult {
    /** Name of the class. Class names are translated in the language defined by the **Accept-Language** request header for the build-in classifier IDs (`default`, `food`, and `explicit`). Class names of custom classifiers are not translated. The response might not be in the specified language when the requested language is not supported or when there is no translation for the class name. */
    class_name: string;
    /** Confidence score for the property in the range of 0 to 1. A higher score indicates greater likelihood that the class is depicted in the image. The default threshold for returning scores from a classifier is 0.5. */
    score: number;
    /** Knowledge graph of the property. For example, `/fruit/pome/apple/eating apple/Granny Smith`. Included only if identified. */
    type_hierarchy?: string;
  }

  /** Results for one image. */
  export interface ClassifiedImage {
    /** Source of the image before any redirects. Not returned when the image is uploaded. */
    source_url?: string;
    /** Fully resolved URL of the image after redirects are followed. Not returned when the image is uploaded. */
    resolved_url?: string;
    /** Relative path of the image file if uploaded directly. Not returned when the image is passed by URL. */
    image?: string;
    /** Information about what might have caused a failure, such as an image that is too large. Not returned when there is no error. */
    error?: ErrorInfo;
    /** The classifiers. */
    classifiers: ClassifierResult[];
  }

  /** Results for all images. */
  export interface ClassifiedImages {
    /** Number of custom classes identified in the images. */
    custom_classes?: number;
    /** Number of images processed for the API call. */
    images_processed?: number;
    /** Classified images. */
    images: ClassifiedImage[];
    /** Information about what might cause less than optimal output. For example, a request sent with a corrupt .zip file and a list of image URLs will still complete, but does not return the expected output. Not returned when there is no warning. */
    warnings?: WarningInfo[];
  }

  /** Information about a classifier. */
  export interface Classifier {
    /** ID of a classifier identified in the image. */
    classifier_id: string;
    /** Name of the classifier. */
    name: string;
    /** Unique ID of the account who owns the classifier. Might not be returned by some requests. */
    owner?: string;
    /** Training status of classifier. */
    status?: string;
    /** Whether the classifier can be downloaded as a Core ML model after the training status is `ready`. */
    core_ml_enabled?: boolean;
    /** If classifier training has failed, this field might explain why. */
    explanation?: string;
    /** Date and time in Coordinated Universal Time (UTC) that the classifier was created. */
    created?: string;
    /** Classes that define a classifier. */
    classes?: Class[];
    /** Date and time in Coordinated Universal Time (UTC) that the classifier was updated. Might not be returned by some requests. Identical to `updated` and retained for backward compatibility. */
    retrained?: string;
    /** Date and time in Coordinated Universal Time (UTC) that the classifier was most recently updated. The field matches either `retrained` or `created`. Might not be returned by some requests. */
    updated?: string;
  }

  /** Classifier and score combination. */
  export interface ClassifierResult {
    /** Name of the classifier. */
    name: string;
    /** ID of a classifier identified in the image. */
    classifier_id: string;
    /** Classes within the classifier. */
    classes: ClassResult[];
  }

  /** A container for the list of classifiers. */
  export interface Classifiers {
    /** List of classifiers. */
    classifiers: Classifier[];
  }

  /** Results for all faces. */
  export interface DetectedFaces {
    /** Number of images processed for the API call. */
    images_processed: number;
    /** The images. */
    images: ImageWithFaces[];
    /** Information about what might cause less than optimal output. For example, a request sent with a corrupt .zip file and a list of image URLs will still complete, but does not return the expected output. Not returned when there is no warning. */
    warnings?: WarningInfo[];
  }

  /** Information about what might have caused a failure, such as an image that is too large. Not returned when there is no error. */
  export interface ErrorInfo {
    /** HTTP status code. */
    code: number;
    /** Human-readable error description. For example, `File size limit exceeded`. */
    description: string;
    /** Codified error string. For example, `limit_exceeded`. */
    error_id: string;
  }

  /** Information about the face. */
  export interface Face {
    /** Age information about a face. */
    age?: FaceAge;
    /** Information about the gender of the face. */
    gender?: FaceGender;
    /** The location of the bounding box around the face. */
    face_location?: FaceLocation;
  }

  /** Age information about a face. */
  export interface FaceAge {
    /** Estimated minimum age. */
    min?: number;
    /** Estimated maximum age. */
    max?: number;
    /** Confidence score in the range of 0 to 1. A higher score indicates greater confidence in the estimated value for the property. */
    score: number;
  }

  /** Information about the gender of the face. */
  export interface FaceGender {
    /** Gender identified by the face. For example, `MALE` or `FEMALE`. */
    gender: string;
    /** The word for "male" or "female" in the language defined by the **Accept-Language** request header. */
    gender_label: string;
    /** Confidence score in the range of 0 to 1. A higher score indicates greater confidence in the estimated value for the property. */
    score: number;
  }

  /** The location of the bounding box around the face. */
  export interface FaceLocation {
    /** Width in pixels of face region. */
    width: number;
    /** Height in pixels of face region. */
    height: number;
    /** X-position of top-left pixel of face region. */
    left: number;
    /** Y-position of top-left pixel of face region. */
    top: number;
  }

  /** Information about faces in the image. */
  export interface ImageWithFaces {
    /** Faces detected in the images. */
    faces: Face[];
    /** Relative path of the image file if uploaded directly. Not returned when the image is passed by URL. */
    image?: string;
    /** Source of the image before any redirects. Not returned when the image is uploaded. */
    source_url?: string;
    /** Fully resolved URL of the image after redirects are followed. Not returned when the image is uploaded. */
    resolved_url?: string;
    /** Information about what might have caused a failure, such as an image that is too large. Not returned when there is no error. */
    error?: ErrorInfo;
  }

  /** Information about something that went wrong. */
  export interface WarningInfo {
    /** Codified warning string, such as `limit_reached`. */
    warning_id: string;
    /** Information about the error. */
    description: string;
  }

}

export = VisualRecognitionV3;
