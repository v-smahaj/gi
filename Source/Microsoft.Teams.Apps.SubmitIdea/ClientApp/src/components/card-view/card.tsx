﻿// <copyright file="card.tsx" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

import * as React from "react";
import { Flex, Text, Loader, Dialog } from "@fluentui/react-northstar";
import Tag from "./tag";
import { IDiscoverPost } from "./idea-wrapper-page";
import CategoryLabel from "./category-label";
import Thumbnail from "./thumbnail";
import Upvotes from "./upvotes";
import { getInitials } from "../../helpers/helper";
import { addUserVote, deleteUserVote } from "../../api/idea-api";
import { WithTranslation, withTranslation } from "react-i18next";
import { TFunction } from "i18next";
import ViewIdeaDialogContent from "../add-new-dialog/upvote-idea-dialog";

import "../../styles/card.css";

interface ICardProps extends WithTranslation {
    cardDetails: IDiscoverPost;
    index: number;
    onDeleteButtonClick: (postId: string, isSuccess: boolean) => void;
    onAddPrivatePostClick: (isSuccess: boolean, message?: string) => void;
    onCardUpdate: (cardDetails: IDiscoverPost, isSuccess: boolean) => void;
    onVoteClick: (isSuccess: boolean, isLiked: boolean) => void;
}

interface ICardState {
    isVoteLoading: boolean;
    isMoreMenuLoading: boolean;
    cardDetails: IDiscoverPost;
    editDialogOpen: boolean;
}

class Card extends React.Component<ICardProps, ICardState> {
    localize: TFunction;

    constructor(props: any) {
        super(props);

        this.localize = this.props.t;
        this.state = {
            isVoteLoading: false,
            isMoreMenuLoading: false,
            cardDetails: this.props.cardDetails,
            editDialogOpen: false
        }
    }

    componentWillReceiveProps(nextProps: ICardProps) {
        if (nextProps.cardDetails !== this.props.cardDetails) {
            this.setState({ cardDetails: nextProps.cardDetails })
        }
    }

	/**
    *Submits user vote information to API.
    */
    onVoteClick = async () => {
        let cardDetails = { ...this.state.cardDetails };
        this.setState({ isVoteLoading: true });
        if (!cardDetails.isVotedByUser) {
            let response = await addUserVote({ postId: cardDetails.ideaId, userId: cardDetails.createdByObjectId });
            if (response.status === 200 && response.data) {
                cardDetails.isVotedByUser = true;
                cardDetails.totalVotes = cardDetails.totalVotes + 1;
                this.setState({ cardDetails: cardDetails });
                this.props.onVoteClick(true, true);
            }
            else {
                this.props.onVoteClick(false, true);
            }
        }
        else {
            let response = await deleteUserVote({ postId: cardDetails.ideaId, userId: cardDetails.createdByObjectId });
            if (response.status === 200 || response.data) {
                cardDetails.isVotedByUser = false;
                cardDetails.totalVotes = cardDetails.totalVotes - 1;
                this.setState({ cardDetails: cardDetails });
                this.props.onVoteClick(true, false);
            }
            else {
                this.props.onVoteClick(false, false);
            }
        }

        this.setState({ isVoteLoading: false });
    }

    /**
	*Changes dialog open state to show and hide dialog.
	*@param isOpen Boolean indication whether to show dialog
	*/
    changeDialogOpenState = (isOpen: boolean) => {
        this.setState({ editDialogOpen: isOpen })
    }

    /**
	*Invoked when card is updated.
    *@param cardDetails Post card details.
    *@param isSuccess  Success status.
	*/
    onUpdateCard = (cardDetails: IDiscoverPost, isSuccess: boolean) => {
        this.setState({
            cardDetails: cardDetails
        });

        this.props.onCardUpdate(cardDetails, isSuccess);
    };

	/**
    * Renders the component
    */
    public render(): JSX.Element {
        return (
            <div id={this.props.index.toString()} className="card-bg">
                <Flex gap="gap.smaller" vAlign="center">
                    <Thumbnail isVisible={false} imageUrl={this.state.cardDetails.contentUrl} />
                </Flex>
                <div className="card-body">
                    <Flex gap="gap.smaller" column vAlign="start">
                        <Flex gap="gap.smaller" className="title-flex">
                            <Dialog
                                className="dialog-container"
                                content={
                                    <ViewIdeaDialogContent
                                        onVoteClick={this.onVoteClick}
                                        changeDialogOpenState={this.changeDialogOpenState}
                                        cardDetails={this.state.cardDetails}
                                    />
                                }
                                open={this.state.editDialogOpen}
                                onOpen={() => this.setState({ editDialogOpen: true })}
                                trigger={<Text className="title-text" size="large" content={this.state.cardDetails.title} title={this.state.cardDetails.title} weight="bold" onClick={() => this.changeDialogOpenState(true)} />}
                            />

                        </Flex>
                        <Flex gap="gap.smaller">
                            <CategoryLabel categoryName={this.state.cardDetails.category} />
                        </Flex>
                        <Flex className="content-flex" gap="gap.small">
                            <Text size="small" className="content-text" title={this.state.cardDetails.description} content={this.state.cardDetails.description} />
                        </Flex>
                    </Flex>
                </div>
                <div className="footer-flex">
                    <Flex gap="gap.smaller" className="tags-flex" vAlign="center">
                        {
                            this.state.cardDetails.tags.split(";").map((value: string, index: number) => {
                                if (value.trim().length > 0) {
                                    return <Tag key={index} index={index} tagContent={value.trim()} showRemoveIcon={false} />
                                }
                            })
                        }
                    </Flex>
                    <Flex gap="gap.smaller" className="more-menu-bar" vAlign="center">
                        <Flex vAlign="center">
                            <div className="user-avatar-card" style={{ backgroundColor: this.state.cardDetails.avatarBackgroundColor }}>
                                <Text className="initials-color" content={getInitials(this.state.cardDetails.createdByName)} title={this.state.cardDetails.createdByName} />
                            </div>&nbsp;<Text className="author-name" title={this.state.cardDetails.createdByName} content={this.state.cardDetails.createdByName} /></Flex>
                        <Flex.Item push>
                            <div></div>
                        </Flex.Item>
                        {
                            this.state.isVoteLoading === false ? <Upvotes isSelected={this.state.cardDetails.isVotedByUser === undefined ? false : this.state.cardDetails.isVotedByUser} upvoteCount={this.state.cardDetails.totalVotes.toString()} />
                                : <Loader size="small" />
                        }
                    </Flex>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Card)