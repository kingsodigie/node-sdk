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
import { BaseService, getMissingParams } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Analyze various features of text content at scale. Provide text, raw HTML, or a public URL and IBM Watson Natural Language Understanding will give you results for the features you request. The service cleans HTML content before analysis by default, so the results can ignore most advertisements and other unwanted content.  You can create [custom models](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-customizing) with Watson Knowledge Studio to detect custom entities, relations, and categories in Natural Language Understanding.
 */

class NaturalLanguageUnderstandingV1 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/natural-language-understanding/api';
  name: string; // set by prototype to 'natural-language-understanding'
  serviceVersion: string; // set by prototype to 'v1'

  /**
   * Construct a NaturalLanguageUnderstandingV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/natural-language-understanding/api'). The base url may differ between IBM Cloud regions.
   * @param {string} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of IBM Cloud. When running on IBM Cloud, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of IBM Cloud. When running on IBM Cloud, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
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
   * @returns {NaturalLanguageUnderstandingV1}
   * @throws {Error}
   */
  constructor(options: NaturalLanguageUnderstandingV1.Options) {
    super(options);
    // check if 'version' was provided
    if (typeof this._options.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this._options.qs.version = options.version;
  }

  /*************************
   * analyze
   ************************/

  /**
   * Analyze text.
   *
   * Analyzes text, HTML, or a public webpage for the following features:
   * - Categories
   * - Concepts
   * - Emotion
   * - Entities
   * - Keywords
   * - Metadata
   * - Relations
   * - Semantic roles
   * - Sentiment
   * - Syntax (Experimental).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {Features} params.features - Specific features to analyze the document for.
   * @param {string} [params.text] - The plain text to analyze. One of the `text`, `html`, or `url` parameters is
   * required.
   * @param {string} [params.html] - The HTML file to analyze. One of the `text`, `html`, or `url` parameters is
   * required.
   * @param {string} [params.url] - The webpage to analyze. One of the `text`, `html`, or `url` parameters is required.
   * @param {boolean} [params.clean] - Set this to `false` to disable webpage cleaning. To learn more about webpage
   * cleaning, see the [Analyzing
   * webpages](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-analyzing-webpages)
   * documentation.
   * @param {string} [params.xpath] - An [XPath
   * query](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-analyzing-webpages#xpath)
   * to perform on `html` or `url` input. Results of the query will be appended to the cleaned webpage text before it is
   * analyzed. To analyze only the results of the XPath query, set the `clean` parameter to `false`.
   * @param {boolean} [params.fallback_to_raw] - Whether to use raw HTML content if text cleaning fails.
   * @param {boolean} [params.return_analyzed_text] - Whether or not to return the analyzed text.
   * @param {string} [params.language] - ISO 639-1 code that specifies the language of your text. This overrides
   * automatic language detection. Language support differs depending on the features you include in your analysis. See
   * [Language
   * support](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-language-support)
   * for more information.
   * @param {number} [params.limit_text_characters] - Sets the maximum number of characters that are processed by the
   * service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public analyze(params: NaturalLanguageUnderstandingV1.AnalyzeParams, callback?: NaturalLanguageUnderstandingV1.Callback<NaturalLanguageUnderstandingV1.AnalysisResults>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['features'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.analyze(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'features': _params.features,
      'text': _params.text,
      'html': _params.html,
      'url': _params.url,
      'clean': _params.clean,
      'xpath': _params.xpath,
      'fallback_to_raw': _params.fallback_to_raw,
      'return_analyzed_text': _params.return_analyzed_text,
      'language': _params.language,
      'limit_text_characters': _params.limit_text_characters
    };

    const sdkHeaders = getSdkHeaders('natural-language-understanding', 'v1', 'analyze');

    const parameters = {
      options: {
        url: '/v1/analyze',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * manageModels
   ************************/

  /**
   * List models.
   *
   * Lists Watson Knowledge Studio [custom entities and relations
   * models](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-customizing)
   * that are deployed to your Natural Language Understanding service.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listModels(params?: NaturalLanguageUnderstandingV1.ListModelsParams, callback?: NaturalLanguageUnderstandingV1.Callback<NaturalLanguageUnderstandingV1.ListModelsResults>): Promise<any> | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listModels(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const sdkHeaders = getSdkHeaders('natural-language-understanding', 'v1', 'listModels');

    const parameters = {
      options: {
        url: '/v1/models',
        method: 'GET',
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
   * Delete model.
   *
   * Deletes a custom model.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.model_id - Model ID of the model to delete.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteModel(params: NaturalLanguageUnderstandingV1.DeleteModelParams, callback?: NaturalLanguageUnderstandingV1.Callback<NaturalLanguageUnderstandingV1.DeleteModelResults>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['model_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteModel(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'model_id': _params.model_id
    };

    const sdkHeaders = getSdkHeaders('natural-language-understanding', 'v1', 'deleteModel');

    const parameters = {
      options: {
        url: '/v1/models/{model_id}',
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

}

NaturalLanguageUnderstandingV1.prototype.name = 'natural-language-understanding';
NaturalLanguageUnderstandingV1.prototype.serviceVersion = 'v1';

/*************************
 * interfaces
 ************************/

namespace NaturalLanguageUnderstandingV1 {

  /** Options for the `NaturalLanguageUnderstandingV1` constructor. */
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

  /** Parameters for the `analyze` operation. */
  export interface AnalyzeParams {
    /** Specific features to analyze the document for. */
    features: Features;
    /** The plain text to analyze. One of the `text`, `html`, or `url` parameters is required. */
    text?: string;
    /** The HTML file to analyze. One of the `text`, `html`, or `url` parameters is required. */
    html?: string;
    /** The webpage to analyze. One of the `text`, `html`, or `url` parameters is required. */
    url?: string;
    /** Set this to `false` to disable webpage cleaning. To learn more about webpage cleaning, see the [Analyzing webpages](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-analyzing-webpages) documentation. */
    clean?: boolean;
    /** An [XPath query](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-analyzing-webpages#xpath) to perform on `html` or `url` input. Results of the query will be appended to the cleaned webpage text before it is analyzed. To analyze only the results of the XPath query, set the `clean` parameter to `false`. */
    xpath?: string;
    /** Whether to use raw HTML content if text cleaning fails. */
    fallback_to_raw?: boolean;
    /** Whether or not to return the analyzed text. */
    return_analyzed_text?: boolean;
    /** ISO 639-1 code that specifies the language of your text. This overrides automatic language detection. Language support differs depending on the features you include in your analysis. See [Language support](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-language-support) for more information. */
    language?: string;
    /** Sets the maximum number of characters that are processed by the service. */
    limit_text_characters?: number;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listModels` operation. */
  export interface ListModelsParams {
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteModel` operation. */
  export interface DeleteModelParams {
    /** Model ID of the model to delete. */
    model_id: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /*************************
   * model interfaces
   ************************/

  /** Results of the analysis, organized by feature. */
  export interface AnalysisResults {
    /** Language used to analyze the text. */
    language?: string;
    /** Text that was used in the analysis. */
    analyzed_text?: string;
    /** URL of the webpage that was analyzed. */
    retrieved_url?: string;
    /** API usage information for the request. */
    usage?: AnalysisResultsUsage;
    /** The general concepts referenced or alluded to in the analyzed text. */
    concepts?: ConceptsResult[];
    /** The entities detected in the analyzed text. */
    entities?: EntitiesResult[];
    /** The keywords from the analyzed text. */
    keywords?: KeywordsResult[];
    /** The categories that the service assigned to the analyzed text. */
    categories?: CategoriesResult[];
    /** The anger, disgust, fear, joy, or sadness conveyed by the content. */
    emotion?: EmotionResult;
    /** Webpage metadata, such as the author and the title of the page. */
    metadata?: AnalysisResultsMetadata;
    /** The relationships between entities in the content. */
    relations?: RelationsResult[];
    /** Sentences parsed into `subject`, `action`, and `object` form. */
    semantic_roles?: SemanticRolesResult[];
    /** The sentiment of the content. */
    sentiment?: SentimentResult;
    /** Tokens and sentences returned from syntax analysis. */
    syntax?: SyntaxResult;
  }

  /** Webpage metadata, such as the author and the title of the page. */
  export interface AnalysisResultsMetadata {
    /** The authors of the document. */
    authors?: Author[];
    /** The publication date in the format ISO 8601. */
    publication_date?: string;
    /** The title of the document. */
    title?: string;
    /** URL of a prominent image on the webpage. */
    image?: string;
    /** RSS/ATOM feeds found on the webpage. */
    feeds?: Feed[];
  }

  /** API usage information for the request. */
  export interface AnalysisResultsUsage {
    /** Number of features used in the API call. */
    features?: number;
    /** Number of text characters processed. */
    text_characters?: number;
    /** Number of 10,000-character units processed. */
    text_units?: number;
  }

  /** The author of the analyzed content. */
  export interface Author {
    /** Name of the author. */
    name?: string;
  }

  /** Returns a five-level taxonomy of the content. The top three categories are returned. Supported languages: Arabic, English, French, German, Italian, Japanese, Korean, Portuguese, Spanish. */
  export interface CategoriesOptions {
    /** Set this to `true` to return explanations for each categorization. **This is available only for English categories.**. */
    explanation?: boolean;
    /** Maximum number of categories to return. */
    limit?: number;
    /** Enter a [custom model](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-customizing) ID to override the standard categories model. */
    model?: string;
  }

  /** Relevant text that contributed to the categorization. */
  export interface CategoriesRelevantText {
    /** Text from the analyzed source that supports the categorization. */
    text?: string;
  }

  /** A categorization of the analyzed text. */
  export interface CategoriesResult {
    /** The path to the category through the 5-level taxonomy hierarchy. For the complete list of categories, see the [Categories hierarchy](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-categories#categories-hierarchy) documentation. */
    label?: string;
    /** Confidence score for the category classification. Higher values indicate greater confidence. */
    score?: number;
    /** Information that helps to explain what contributed to the categories result. */
    explanation?: CategoriesResultExplanation;
  }

  /** Information that helps to explain what contributed to the categories result. */
  export interface CategoriesResultExplanation {
    /** An array of relevant text from the source that contributed to the categorization. The sorted array begins with the phrase that contributed most significantly to the result, followed by phrases that were less and less impactful. */
    relevant_text?: CategoriesRelevantText[];
  }

  /** Returns high-level concepts in the content. For example, a research paper about deep learning might return the concept, "Artificial Intelligence" although the term is not mentioned. Supported languages: English, French, German, Italian, Japanese, Korean, Portuguese, Spanish. */
  export interface ConceptsOptions {
    /** Maximum number of concepts to return. */
    limit?: number;
  }

  /** The general concepts referenced or alluded to in the analyzed text. */
  export interface ConceptsResult {
    /** Name of the concept. */
    text?: string;
    /** Relevance score between 0 and 1. Higher scores indicate greater relevance. */
    relevance?: number;
    /** Link to the corresponding DBpedia resource. */
    dbpedia_resource?: string;
  }

  /** Delete model results. */
  export interface DeleteModelResults {
    /** model_id of the deleted model. */
    deleted?: string;
  }

  /** Disambiguation information for the entity. */
  export interface DisambiguationResult {
    /** Common entity name. */
    name?: string;
    /** Link to the corresponding DBpedia resource. */
    dbpedia_resource?: string;
    /** Entity subtype information. */
    subtype?: string[];
  }

  /** Emotion results for the document as a whole. */
  export interface DocumentEmotionResults {
    /** Emotion results for the document as a whole. */
    emotion?: EmotionScores;
  }

  /** DocumentSentimentResults. */
  export interface DocumentSentimentResults {
    /** Indicates whether the sentiment is positive, neutral, or negative. */
    label?: string;
    /** Sentiment score from -1 (negative) to 1 (positive). */
    score?: number;
  }

  /** Detects anger, disgust, fear, joy, or sadness that is conveyed in the content or by the context around target phrases specified in the targets parameter. You can analyze emotion for detected entities with `entities.emotion` and for keywords with `keywords.emotion`. Supported languages: English. */
  export interface EmotionOptions {
    /** Set this to `false` to hide document-level emotion results. */
    document?: boolean;
    /** Emotion results will be returned for each target string that is found in the document. */
    targets?: string[];
  }

  /** The detected anger, disgust, fear, joy, or sadness that is conveyed by the content. Emotion information can be returned for detected entities, keywords, or user-specified target phrases found in the text. */
  export interface EmotionResult {
    /** Emotion results for the document as a whole. */
    document?: DocumentEmotionResults;
    /** Emotion results for specified targets. */
    targets?: TargetedEmotionResults[];
  }

  /** EmotionScores. */
  export interface EmotionScores {
    /** Anger score from 0 to 1. A higher score means that the text is more likely to convey anger. */
    anger?: number;
    /** Disgust score from 0 to 1. A higher score means that the text is more likely to convey disgust. */
    disgust?: number;
    /** Fear score from 0 to 1. A higher score means that the text is more likely to convey fear. */
    fear?: number;
    /** Joy score from 0 to 1. A higher score means that the text is more likely to convey joy. */
    joy?: number;
    /** Sadness score from 0 to 1. A higher score means that the text is more likely to convey sadness. */
    sadness?: number;
  }

  /** Identifies people, cities, organizations, and other entities in the content. See [Entity types and subtypes](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-entity-types). Supported languages: English, French, German, Italian, Japanese, Korean, Portuguese, Russian, Spanish, Swedish. Arabic, Chinese, and Dutch are supported only through custom models. */
  export interface EntitiesOptions {
    /** Maximum number of entities to return. */
    limit?: number;
    /** Set this to `true` to return locations of entity mentions. */
    mentions?: boolean;
    /** Enter a [custom model](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-customizing) ID to override the standard entity detection model. */
    model?: string;
    /** Set this to `true` to return sentiment information for detected entities. */
    sentiment?: boolean;
    /** Set this to `true` to analyze emotion for detected keywords. */
    emotion?: boolean;
  }

  /** The important people, places, geopolitical entities and other types of entities in your content. */
  export interface EntitiesResult {
    /** Entity type. */
    type?: string;
    /** The name of the entity. */
    text?: string;
    /** Relevance score from 0 to 1. Higher values indicate greater relevance. */
    relevance?: number;
    /** Confidence in the entity identification from 0 to 1. Higher values indicate higher confidence. In standard entities requests, confidence is returned only for English text. All entities requests that use custom models return the confidence score. */
    confidence?: number;
    /** Entity mentions and locations. */
    mentions?: EntityMention[];
    /** How many times the entity was mentioned in the text. */
    count?: number;
    /** Emotion analysis results for the entity, enabled with the `emotion` option. */
    emotion?: EmotionScores;
    /** Sentiment analysis results for the entity, enabled with the `sentiment` option. */
    sentiment?: FeatureSentimentResults;
    /** Disambiguation information for the entity. */
    disambiguation?: DisambiguationResult;
  }

  /** EntityMention. */
  export interface EntityMention {
    /** Entity mention text. */
    text?: string;
    /** Character offsets indicating the beginning and end of the mention in the analyzed text. */
    location?: number[];
    /** Confidence in the entity identification from 0 to 1. Higher values indicate higher confidence. In standard entities requests, confidence is returned only for English text. All entities requests that use custom models return the confidence score. */
    confidence?: number;
  }

  /** FeatureSentimentResults. */
  export interface FeatureSentimentResults {
    /** Sentiment score from -1 (negative) to 1 (positive). */
    score?: number;
  }

  /** Analysis features and options. */
  export interface Features {
    /** Returns high-level concepts in the content. For example, a research paper about deep learning might return the concept, "Artificial Intelligence" although the term is not mentioned. Supported languages: English, French, German, Italian, Japanese, Korean, Portuguese, Spanish. */
    concepts?: ConceptsOptions;
    /** Detects anger, disgust, fear, joy, or sadness that is conveyed in the content or by the context around target phrases specified in the targets parameter. You can analyze emotion for detected entities with `entities.emotion` and for keywords with `keywords.emotion`. Supported languages: English. */
    emotion?: EmotionOptions;
    /** Identifies people, cities, organizations, and other entities in the content. See [Entity types and subtypes](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-entity-types). Supported languages: English, French, German, Italian, Japanese, Korean, Portuguese, Russian, Spanish, Swedish. Arabic, Chinese, and Dutch are supported only through custom models. */
    entities?: EntitiesOptions;
    /** Returns important keywords in the content. Supported languages: English, French, German, Italian, Japanese, Korean, Portuguese, Russian, Spanish, Swedish. */
    keywords?: KeywordsOptions;
    /** Returns information from the document, including author name, title, RSS/ATOM feeds, prominent page image, and publication date. Supports URL and HTML input types only. */
    metadata?: MetadataOptions;
    /** Recognizes when two entities are related and identifies the type of relation. For example, an `awardedTo` relation might connect the entities "Nobel Prize" and "Albert Einstein". See [Relation types](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-relations). Supported languages: Arabic, English, German, Japanese, Korean, Spanish. Chinese, Dutch, French, Italian, and Portuguese custom models are also supported. */
    relations?: RelationsOptions;
    /** Parses sentences into subject, action, and object form. Supported languages: English, German, Japanese, Korean, Spanish. */
    semantic_roles?: SemanticRolesOptions;
    /** Analyzes the general sentiment of your content or the sentiment toward specific target phrases. You can analyze sentiment for detected entities with `entities.sentiment` and for keywords with `keywords.sentiment`. Supported languages: Arabic, English, French, German, Italian, Japanese, Korean, Portuguese, Russian, Spanish. */
    sentiment?: SentimentOptions;
    /** Returns a five-level taxonomy of the content. The top three categories are returned. Supported languages: Arabic, English, French, German, Italian, Japanese, Korean, Portuguese, Spanish. */
    categories?: CategoriesOptions;
    /** Returns tokens and sentences from the input text. */
    syntax?: SyntaxOptions;
  }

  /** RSS or ATOM feed found on the webpage. */
  export interface Feed {
    /** URL of the RSS or ATOM feed. */
    link?: string;
  }

  /** Returns important keywords in the content. Supported languages: English, French, German, Italian, Japanese, Korean, Portuguese, Russian, Spanish, Swedish. */
  export interface KeywordsOptions {
    /** Maximum number of keywords to return. */
    limit?: number;
    /** Set this to `true` to return sentiment information for detected keywords. */
    sentiment?: boolean;
    /** Set this to `true` to analyze emotion for detected keywords. */
    emotion?: boolean;
  }

  /** The important keywords in the content, organized by relevance. */
  export interface KeywordsResult {
    /** Number of times the keyword appears in the analyzed text. */
    count?: number;
    /** Relevance score from 0 to 1. Higher values indicate greater relevance. */
    relevance?: number;
    /** The keyword text. */
    text?: string;
    /** Emotion analysis results for the keyword, enabled with the `emotion` option. */
    emotion?: EmotionScores;
    /** Sentiment analysis results for the keyword, enabled with the `sentiment` option. */
    sentiment?: FeatureSentimentResults;
  }

  /** Custom models that are available for entities and relations. */
  export interface ListModelsResults {
    /** An array of available models. */
    models?: Model[];
  }

  /** Returns information from the document, including author name, title, RSS/ATOM feeds, prominent page image, and publication date. Supports URL and HTML input types only. */
  export interface MetadataOptions {
  }

  /** Model. */
  export interface Model {
    /** When the status is `available`, the model is ready to use. */
    status?: string;
    /** Unique model ID. */
    model_id?: string;
    /** ISO 639-1 code indicating the language of the model. */
    language?: string;
    /** Model description. */
    description?: string;
    /** ID of the Watson Knowledge Studio workspace that deployed this model to Natural Language Understanding. */
    workspace_id?: string;
    /** The model version, if it was manually provided in Watson Knowledge Studio. */
    version?: string;
    /** The description of the version, if it was manually provided in Watson Knowledge Studio. */
    version_description?: string;
    /** A dateTime indicating when the model was created. */
    created?: string;
  }

  /** RelationArgument. */
  export interface RelationArgument {
    /** An array of extracted entities. */
    entities?: RelationEntity[];
    /** Character offsets indicating the beginning and end of the mention in the analyzed text. */
    location?: number[];
    /** Text that corresponds to the argument. */
    text?: string;
  }

  /** An entity that corresponds with an argument in a relation. */
  export interface RelationEntity {
    /** Text that corresponds to the entity. */
    text?: string;
    /** Entity type. */
    type?: string;
  }

  /** Recognizes when two entities are related and identifies the type of relation. For example, an `awardedTo` relation might connect the entities "Nobel Prize" and "Albert Einstein". See [Relation types](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-relations). Supported languages: Arabic, English, German, Japanese, Korean, Spanish. Chinese, Dutch, French, Italian, and Portuguese custom models are also supported. */
  export interface RelationsOptions {
    /** Enter a [custom model](https://cloud.ibm.com/docs/services/natural-language-understanding?topic=natural-language-understanding-customizing) ID to override the default model. */
    model?: string;
  }

  /** The relations between entities found in the content. */
  export interface RelationsResult {
    /** Confidence score for the relation. Higher values indicate greater confidence. */
    score?: number;
    /** The sentence that contains the relation. */
    sentence?: string;
    /** The type of the relation. */
    type?: string;
    /** Entity mentions that are involved in the relation. */
    arguments?: RelationArgument[];
  }

  /** SemanticRolesEntity. */
  export interface SemanticRolesEntity {
    /** Entity type. */
    type?: string;
    /** The entity text. */
    text?: string;
  }

  /** SemanticRolesKeyword. */
  export interface SemanticRolesKeyword {
    /** The keyword text. */
    text?: string;
  }

  /** Parses sentences into subject, action, and object form. Supported languages: English, German, Japanese, Korean, Spanish. */
  export interface SemanticRolesOptions {
    /** Maximum number of semantic_roles results to return. */
    limit?: number;
    /** Set this to `true` to return keyword information for subjects and objects. */
    keywords?: boolean;
    /** Set this to `true` to return entity information for subjects and objects. */
    entities?: boolean;
  }

  /** The object containing the actions and the objects the actions act upon. */
  export interface SemanticRolesResult {
    /** Sentence from the source that contains the subject, action, and object. */
    sentence?: string;
    /** The extracted subject from the sentence. */
    subject?: SemanticRolesResultSubject;
    /** The extracted action from the sentence. */
    action?: SemanticRolesResultAction;
    /** The extracted object from the sentence. */
    object?: SemanticRolesResultObject;
  }

  /** The extracted action from the sentence. */
  export interface SemanticRolesResultAction {
    /** Analyzed text that corresponds to the action. */
    text?: string;
    /** normalized version of the action. */
    normalized?: string;
    verb?: SemanticRolesVerb;
  }

  /** The extracted object from the sentence. */
  export interface SemanticRolesResultObject {
    /** Object text. */
    text?: string;
    /** An array of extracted keywords. */
    keywords?: SemanticRolesKeyword[];
  }

  /** The extracted subject from the sentence. */
  export interface SemanticRolesResultSubject {
    /** Text that corresponds to the subject role. */
    text?: string;
    /** An array of extracted entities. */
    entities?: SemanticRolesEntity[];
    /** An array of extracted keywords. */
    keywords?: SemanticRolesKeyword[];
  }

  /** SemanticRolesVerb. */
  export interface SemanticRolesVerb {
    /** The keyword text. */
    text?: string;
    /** Verb tense. */
    tense?: string;
  }

  /** SentenceResult. */
  export interface SentenceResult {
    /** The sentence. */
    text?: string;
    /** Character offsets indicating the beginning and end of the sentence in the analyzed text. */
    location?: number[];
  }

  /** Analyzes the general sentiment of your content or the sentiment toward specific target phrases. You can analyze sentiment for detected entities with `entities.sentiment` and for keywords with `keywords.sentiment`. Supported languages: Arabic, English, French, German, Italian, Japanese, Korean, Portuguese, Russian, Spanish. */
  export interface SentimentOptions {
    /** Set this to `false` to hide document-level sentiment results. */
    document?: boolean;
    /** Sentiment results will be returned for each target string that is found in the document. */
    targets?: string[];
  }

  /** The sentiment of the content. */
  export interface SentimentResult {
    /** The document level sentiment. */
    document?: DocumentSentimentResults;
    /** The targeted sentiment to analyze. */
    targets?: TargetedSentimentResults[];
  }

  /** Returns tokens and sentences from the input text. */
  export interface SyntaxOptions {
    /** Tokenization options. */
    tokens?: SyntaxOptionsTokens;
    /** Set this to `true` to return sentence information. */
    sentences?: boolean;
  }

  /** Tokenization options. */
  export interface SyntaxOptionsTokens {
    /** Set this to `true` to return the lemma for each token. */
    lemma?: boolean;
    /** Set this to `true` to return the part of speech for each token. */
    part_of_speech?: boolean;
  }

  /** Tokens and sentences returned from syntax analysis. */
  export interface SyntaxResult {
    tokens?: TokenResult[];
    sentences?: SentenceResult[];
  }

  /** Emotion results for a specified target. */
  export interface TargetedEmotionResults {
    /** Targeted text. */
    text?: string;
    /** The emotion results for the target. */
    emotion?: EmotionScores;
  }

  /** TargetedSentimentResults. */
  export interface TargetedSentimentResults {
    /** Targeted text. */
    text?: string;
    /** Sentiment score from -1 (negative) to 1 (positive). */
    score?: number;
  }

  /** TokenResult. */
  export interface TokenResult {
    /** The token as it appears in the analyzed text. */
    text?: string;
    /** The part of speech of the token. For descriptions of the values, see [Universal Dependencies POS tags](https://universaldependencies.org/u/pos/). */
    part_of_speech?: string;
    /** Character offsets indicating the beginning and end of the token in the analyzed text. */
    location?: number[];
    /** The [lemma](https://wikipedia.org/wiki/Lemma_%28morphology%29) of the token. */
    lemma?: string;
  }

}

export = NaturalLanguageUnderstandingV1;
