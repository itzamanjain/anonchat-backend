const upVoteWeight = 2.5;
const commentWeight = 3.0;
const trendingDurationHours = 48;

const  calculateTrendingScore = (upVotes, comments, postCreatedAt) => {
    const calculateScore = (upVotes, comments) => {
        return upVotes * upVoteWeight + comments * commentWeight;
    };

    const recencyBoost = (postCreatedAt) => {
        const trendingDurationMilliseconds = trendingDurationHours * 3600 * 1000;
        const decayFactor = Math.log(2) / trendingDurationMilliseconds;
        const timeDifference = Date.now() - new Date(postCreatedAt).getTime();
        return Math.exp(-decayFactor * timeDifference);
    };

    const score = calculateScore(upVotes, comments);
    const recencyBoostFactor = recencyBoost(postCreatedAt);
    
    return score * recencyBoostFactor;
};

export default {
    calculateTrendingScore
}
