// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CrowdFund {
    struct Campaign 
    {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] contributors;
        uint256[] contributions;
                    
    }
    mapping (uint256 => Campaign ) public campaigns;
    uint256 public campaignCount=0;

    function createCampaign(address _owner,string memory _title,string memory _description,uint256 _target,uint256 _deadline,string memory _image)public returns (uint256){
        Campaign storage campaign=campaigns[campaignCount];
        require(campaign.deadline<block.timestamp,"Deadline should be in future");
        campaign.owner=_owner;
        campaign.title=_title;
        campaign.description=_description;
        campaign.target=_target;
        campaign.deadline=_deadline;
        campaign.amountCollected=0;
        campaign.image=_image;
        campaignCount++;

        return campaignCount-1;
    }
    function contributeToCampaign(uint256 _id) public payable{
        uint256 amount=msg.value;
        Campaign storage campaign=campaigns[_id];
        campaign.contributors.push(msg.sender);
        campaign.contributions.push(amount);
    
        (bool sent,)=payable(campaign.owner).call{value:amount}("");
        if(sent){
            campaign.amountCollected+=amount;
        }
    }
    function getContributors(uint256 _id)view public returns(address[] memory,uint256[] memory){
        return (campaigns[_id].contributors,campaigns[_id].contributions);
    }
    function getCampaigns()view public returns(Campaign[] memory){
        Campaign[] memory allCampaigns=new Campaign[](campaignCount);
        for(uint256 i=0;i<campaignCount;i++){
            allCampaigns[i]=campaigns[i];
        }
        return allCampaigns;
    }



}