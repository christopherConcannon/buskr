const { AuthenticationError } = require('apollo-server-express');
const { Creator, Vibe } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
	Query    : {

		vibes    : async () => {
			return await Vibe.find();
    },
    
    // optional parameters for search, otherwise return all
		creators : async (parent, { vibes, username }) => {
			const params = {};

			if (vibes) {
				params.vibes = vibes;
			}

			if (username) {
				params.username = {
					$regex : username
				};
			}

      // remove populate?
			// return await Creator.find(params).populate('vibes');
			return await Creator.find(params).populate('vibes').populate('songs');
    }
    // creators : async () => {
    // 		// return await Creator.find({}).populate('vibes')
    // 		return await Creator.find({}).populate('songs')
		// }

	

	},
	Mutation : {
		addCreator : async (parent, args) => {
			const creator = await Creator.create(args);
			const token = signToken(creator);

			return { token, creator };
    },
    
		login   : async (parent, { email, password }) => {
			const creator = await Creator.findOne({ email });

			if (!creator) {
				throw new AuthenticationError('Can not find creator');
      }

			const correctPw = await creator.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Sorry, incorrect credentials');
			}

			const token = signToken(creator);

			return { token, creator };
    },
    
    updateCreatorBio: async (parent, { bio } , context) => {
      if (context.creator) {
        return await Creator.findByIdAndUpdate(context.creator._id, {bio}, { new: true }).populate('vibes')
      }

      throw new AuthenticationError('Not logged in')
    }, 

    updateCreatorVibes: async (parent, { vibes }, context) => {
      if (context.creator) {
        return await Creator.findByIdAndUpdate(context.creator._id, {vibes}, { new: true } ).populate('vibes')
      }
    }
	}
};

module.exports = resolvers;

// updateUser: async (parent, args, context) => {
//   if (context.user) {
//     return await User.findByIdAndUpdate(context.user._id, args, { new: true });
//   }

//   throw new AuthenticationError('Not logged in');
// },