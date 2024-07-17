window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const selectedUser: string = urlParams.get('user')!;

    function timeSince(timestamp: string): string {

        const pastDate = new Date(timestamp);
        const currentDate = new Date();
    
        const diffInMilliseconds = currentDate.getTime() - pastDate.getTime();
    
        const seconds = Math.floor(diffInMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
    
        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''}`;
        } else if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''}`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''}`;
        }
    }
    
    const getCount = (num: number): string => {
        if (num >= 1000000) {
            return `${num/1000000}M`; // million
        } else if (num >= 1000) {
            return `${num/1000}K`; // thousand
        } else {
            return `${num}`;
        }
    }

    interface TweetObject {
        text: string;
        timestamp: string;
    }
    
    interface UserObject {
        userName: string;
        displayName: string;
        joinedDate: string;
        followingCount: number;
        followerCount: number;
        avatarURL: string;
        coverPhotoURL: string;
        tweets: TweetObject[];
    }
    
    interface Users {
        [key: string]: UserObject;
    }

    const users: Users = {
        user1: {
            userName: '@elonmusk',
            displayName: 'Elon Musk',
            joinedDate: 'June 2009',
            followingCount: 103,
            followerCount: 47900000,
            avatarURL: 'https://odawsbucket1.s3.us-east-2.amazonaws.com/elonmusk.jpg',
            coverPhotoURL: 'https://odawsbucket1.s3.us-east-2.amazonaws.com/elonmusk-cover.jpeg',
            tweets: [
                {
                    text: 'I admit to judging books by their cover',
                    timestamp: '2/10/2021 00:01:20'
                },
                {
                    text: 'Starship to the moon',
                    timestamp: '2/09/2021 18:37:12'
                },
                {
                    text: 'Out on launch pad, engine swap underway',
                    timestamp: '2/09/2021 12:11:51'
                }
            ]
        },
        user2: {
            userName: '@BillGates',
            displayName: 'Bill Gates',
            joinedDate: 'June 2009',
            followingCount: 274,
            followerCount: 53800000,
            avatarURL: 'https://odawsbucket1.s3.us-east-2.amazonaws.com/billgates.jpg',
            coverPhotoURL: 'https://odawsbucket1.s3.us-east-2.amazonaws.com/billgates-cover.jpeg',
            tweets: [
                {
                    text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
                    timestamp: '2/10/2021 00:01:20'
                },
                {
                    text: 'Should I start tweeting memes? Let me know in a comment.',
                    timestamp: '2/09/2021 18:37:12'
                },
                {
                    text: 'In 2020, I read a book every hour.',
                    timestamp: '2/09/2021 12:11:51'
                }
            ]
        }
    }
    
    const user: UserObject = users[selectedUser];

    const content: HTMLElement = document.querySelector('.content')!;

    const header: HTMLElement = document.querySelector('.header-right-section')!;

    const coverPhoto: HTMLElement = document.querySelector('.cover-photo')!;
    
    const profileDetails: HTMLElement = document.querySelector('.profile-details')!;

    const tweetsContainer: HTMLElement = document.querySelector('.tweets-container')!;
    
    const notFoundMessage: HTMLElement = document.querySelector('.not-found-message')!;

    const contentTimeline: HTMLElement = document.querySelector('.timeline')!;

    const getUserTweetHTML = (user: UserObject, tweet: TweetObject): string => {
        return `
            <div class='tweet'>
                <div class='tweet-avatar'><img src='${user.avatarURL}' alt='tweet avatar'></div>
                <div class='tweet-content'>
                    <div class='tweet-heading'>
                        <p class="center-content">
                        <span class='bold-text'>${user.displayName}</span>&nbsp;
                        <img class='twitter-verified' src='https://odawsbucket1.s3.us-east-2.amazonaws.com/twitterVerifiedBadge.png' alt='Verified Badge'>
                        &nbsp;<span class='text-grey'>${user.userName} 
                        <span class='middle-dot'>&#183;</span> ${timeSince(tweet.timestamp)}</span>
                        </p>
                        <p><span class='tweet-options text-grey'>&#183;&#183;&#183;</span></p>
                    </div>
                    <p class='tweet-text'>${tweet.text}</p>
                    <p class='text-grey tweet-stats'>
                        <span><img class='icon-reply' alt='reply' src='https://odawsbucket1.s3.us-east-2.amazonaws.com/reply.svg'>&nbsp;&nbsp;&nbsp;5.2K</span>
                        <span><img class='icon-repost' alt='repost' src='https://odawsbucket1.s3.us-east-2.amazonaws.com/repost.svg'>&nbsp;&nbsp;&nbsp;7.7K</span>
                        <span><img class='icon-like' alt='like' src='https://odawsbucket1.s3.us-east-2.amazonaws.com/like.svg'>&nbsp;&nbsp;&nbsp;65.2K</span>
                        <span class='share'><img class='icon-share' alt='share' src='https://odawsbucket1.s3.us-east-2.amazonaws.com/share.svg'></span></p>
                </div>
            </div>
            `;
    }

    if(user) {

        header.innerHTML += `
                <h2>${user.displayName}<img src="https://odawsbucket1.s3.us-east-2.amazonaws.com/twitterVerifiedBadge.png" alt="Verified Badge"></h2>
                <p>${getCount(user.tweets.length)} Tweets</p>
            `;
      
        coverPhoto.innerHTML = `<img src="${user.coverPhotoURL}" alt="cover photo">`;
    
        profileDetails.innerHTML = `
        <div>
            <img src="${user.avatarURL}" alt="avatar" class="profile-avatar">
            <button>Following</button>
        </div>
        <h2>${user.displayName}<img src="https://odawsbucket1.s3.us-east-2.amazonaws.com/twitterVerifiedBadge.png" alt="Verified Badge"></h2>
        <p class="text-grey">${user.userName}</p>
        <p class="text-grey joined-date"><img class='calendar' src="https://odawsbucket1.s3.us-east-2.amazonaws.com/calendar.svg" alt="calendar">&nbsp;Joined ${user.joinedDate}</p>
        <p class="following-count">${getCount(user.followingCount)} <span class="text-grey"> Following</span></p>
        <p class="follower-count">${getCount(user.followerCount)}<span class="text-grey"> Followers</span></p>
        `;

        let allTweetsHTML: string = '';
        user.tweets.forEach((tweet) => {
            allTweetsHTML += getUserTweetHTML(user, tweet);
        });
        tweetsContainer.innerHTML = allTweetsHTML;

        notFoundMessage.style.display = 'none';
    } else {        
        if (notFoundMessage) {
            notFoundMessage.innerHTML = `<p>User not found. Please check the URL or select a valid user.</p>`;
            notFoundMessage.style.display = 'block';
            content.style.display = 'none';
        }
    }

    if (!user) {

        interface AllTweets {
            user: string;
            tweet: TweetObject;
        }
        let allTweets: AllTweets[] = [];
        
        for(const userKey in users) {
            users[userKey].tweets.forEach(tweet => {
                allTweets.push({user: userKey, tweet: tweet});
            });
        }

        allTweets.sort((a, b) => new Date(b.tweet.timestamp).getTime() - new Date(a.tweet.timestamp).getTime());
        
        let allTweetsHTML: string = '';
        allTweets.forEach(({user, tweet}) => {
            allTweetsHTML += getUserTweetHTML(users[user], tweet);
        });
        tweetsContainer.innerHTML = allTweetsHTML;
    }

}
