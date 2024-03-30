import Post from "../../models/post.model.js";
import mongoose from "mongoose";
import trendingAlgo from "../../helpers/trending-algo.js";
import timeSinceCreated from "../../helpers/timestamp-algo.js";
const { calculateTrendingScore } = trendingAlgo
const {formatTimeSince} = timeSinceCreated
const ObjectId = mongoose.Types.ObjectId;

const fetchPost = async (req, res) => {
  try {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10;
    const topicName = req.query.topicName;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const trending = req.query.trending;
    let posts;
    let totalCount;

    if (topicName === "home") {
      posts = await Post.find()
        .populate({
          path: "user_id",
          select: "username college profession bio bookmarks -_id",
        })
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit)
        .exec();

      totalCOunt = await Post.countDocuments();
    } else {
      posts = await Post.find({
        topic: new RegExp("^" + topicName + "$", "i"),
      })
        .populate({
          path: "user_id",
          select: "username college profession bio -_id",
        })
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit)
        .exec();

        totalCount = await Post.countDocuments({
            topic:new RegExp('^'+topicName+'$','i'),
        })
    }

    const results = {}

    if(endIndex<totalCount){
        results.next = {
            page:page+1,
            limit:limit,
        }
    }

    if(startIndex>0){
        results.previous = {
            
                page:page-1,
                limit:limit,
            
        }
    }

    if(posts.length === 0){
        return res.json({
            message:'No Posts Found for the specific topic!!'
        })

    }

    posts = posts.map((post) => ({
        ...post._doc,
        timeSinceCreated:formatTimeSince(new Date(post.createdAt)),
    }))

    if(trending === 'true'){
        posts.sort((a,b)=>{
            const scoreA = calculateTrendingScore(a.upvotes.length,parseInt(a.totalComments),
            a.createdAt,
            )
            const scoreB = calculateTrendingScore(
                b.upvotes.length,
                parseInt(b.totalComments),
                b.createdAt,
            )
            return scoreB-scoreA
        })
    }

    results.posts = posts
    res.json(results)

  } catch (error) {
    res.status(500).json({
      message: "Error occur while fetching Post",
    });
  }
};

const fetchPostDetails = async (req, res) => {
    const postId = req.params.postId
    if(!ObjectId.isValid(postId)){
        return res.json({
            message:'invalid Post Id format'
        })
    }
    try {
        const postdetails = await Post.findOne({_id:postId})
        .populate({
            path:'user_id',
            select:'username college profession bio _id',

        })
        .exec()

        if(!postdetails){
            res.status(404).json({
                message:
                    'Post Not Found',
                
            })
        }

        res.json({
            postdetails,
            timeSinceCreated:formatTimeSince(new Date(postdetails.createdAt))
        })
    
    
  } catch (error) {

    console.log(error);
  }
};

export { fetchPost, fetchPostDetails };
