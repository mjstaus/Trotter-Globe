// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

/// @custom:security-contact <emergency contact email here>
contract Shop is ERC1155Holder, ReentrancyGuard, Ownable, Token {
    // Variables
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC1155 nft;
        uint tokenId;
        string city;
        string country;
        string image;
        uint price;
        address payable seller;
        address owner;
        bool sold;
    }

    // itemId -> Item
    mapping(uint => Item) public items;

    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    // Make item to offer in the shop
    function makeItem(IERC1155 _nft, uint _tokenId, string memory _city, string memory _country, string memory _image, uint _price) external onlyOwner {
        
        require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount ++;
        // transfer nft
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId, 1, "");
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _city,
            _country,
            _image,
            _price,
            payable(msg.sender),
            msg.sender,
            false
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= item.price, "not enough ether to cover item price");
        require(!item.sold, "item already sold");
        // pay seller
        item.seller.transfer(item.price);
        // update item to sold
        item.sold = true;
        // transfer nft to buyer
        item.nft.safeTransferFrom(address(this), msg.sender, item.tokenId, 1, "");
        // update item to owner = buyer
        item.owner = msg.sender;
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }
    function getPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price));
    }

     function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Receiver) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}