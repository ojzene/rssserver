var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var SettingModel = require('../models/Setting');

var settingType = new GraphQLObjectType({
    name: 'setting',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        blockFontSize: {
            type: GraphQLString
        },
        headlineFontSize: {
            type: GraphQLString
        },
        headlineColor: {
            type: GraphQLString
        },
        blockColor: {
            type: GraphQLString
        },
        blockBgColor: {
            type: GraphQLString
        },
        blockWidth: {
            type: GraphQLString
        },
        blockHeight: {
            type: GraphQLString
        },
        updatedDate: {
          type: GraphQLDate
        }
      }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        settings: {
          type: new GraphQLList(settingType),
          resolve: function () {
            const settings = SettingModel.find().exec()
            if (!settings) {
              throw new Error('Error')
            }
            return settings
          }
        },
        setting: {
          type: settingType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const settingDetails = SettingModel.findById(params.id).exec()
            if (!settingDetails) {
              throw new Error('Error')
            }
            return settingDetails
          }
        }
      }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addSetting: {
          type: settingType,
          args: {
            blockFontSize: {
                type: new GraphQLNonNull(GraphQLString)
            },
            headlineFontSize: {
                type: new GraphQLNonNull(GraphQLString)
            },
            headlineColor: {
                type: new GraphQLNonNull(GraphQLString)
            },
            blockColor: {
                type: new GraphQLNonNull(GraphQLString)
            },
            blockBgColor: {
                type: new GraphQLNonNull(GraphQLString)
            },
            blockWidth: {
                type: new GraphQLNonNull(GraphQLString)
            },
            blockHeight: {
                type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const settingModel = new SettingModel(params);
            const newSetting = settingModel.save();
            if (!newSetting) {
              throw new Error('Error');
            }
            return newSetting
          }
        },
        updateSetting: {
          type: settingType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            blockFontSize: {
                type: new GraphQLNonNull(GraphQLString)
            },
            headlineFontSize: {
                type: new GraphQLNonNull(GraphQLString)
            },
            headlineColor: {
                type: new GraphQLNonNull(GraphQLString)
            },
            blockColor: {
                type: new GraphQLNonNull(GraphQLString)
            },
            blockBgColor: {
                type: new GraphQLNonNull(GraphQLString)
            },
            blockWidth: {
                type: new GraphQLNonNull(GraphQLString)
            },
            blockHeight: {
                type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            return SettingModel.findByIdAndUpdate(params.id, { blockFontSize: params.blockFontSize, headlineFontSize: params.headlineFontSize, headlineColor: params.headlineColor, blockColor: params.blockColor, blockBgColor: params.blockBgColor, blockWidth: params.blockWidth, blockHeight: params.blockHeight, updated_date: new Date() }, function (err) {
              if (err) return next(err);
            });
          }
        },
        removeSetting: {
          type: settingType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const remSetting = SettingModel.findByIdAndRemove(params.id).exec();
            if (!remSetting) {
              throw new Error('Error')
            }
            return remSetting;
          }
        }
      }
    }
  });


module.exports = new GraphQLSchema({query: queryType});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});