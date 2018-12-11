const mongoCollections = require("../config/mongoCollections");
const regional = mongoCollections.regional;
const users = require("./users");
const gallery = require("./gallery");
const uuid = require("node-uuid");

const exportedMethods = {

  async getRegionalById(id) {
    const regionalCollection = await regional();
    const regionalPost = await regionalCollection.findOne({ _id: id });

    if (!regionalPost) throw "Post not found";
    return regionalPost;
  },
  async addRegionalPost( topic, pid, userId) {
      //Create ID?
    if (typeof topic !== "string") throw "No topic provided";
    if (typeof pid !== "string") throw "No pid provided";
    if (typeof pid !== "string") throw "No userId provided";


    const regionalCollection = await regional();

    const userThatPosted = await users.getUserById(userId);
    const galleryThatPosted = await gallery.getGalleryById(pid);
    const newRegional = {
    _id: uuid.v4(),
    creator : {
        name : userThatPosted.name,
        Username : userThatPosted.Username,
        _id : userThatPosted._id
    },
    votes : 0,
    topic : topic,
    location : userThatPosted.profile.regional,
    pid : pid
    };

    const newInsertInformation = await regionalCollection.insertOne(newRegional);
    const newId = newInsertInformation.insertedId;
    return await this.getPostById(newId);
  },
  async removePostRegional(id) {
    const regionalCollection = await regional();
    const deletionInfo = await regionalCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
  },
  async upvotePostRegional(id) {
    area = "regional";
    const updatedVotes = await gallery.upvotePost(id, area);
    return updatedVotes;
  }

};

module.exports = exportedMethods;