﻿// <copyright file="upvotes.tsx" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

import * as React from "react";
import { Text } from "@fluentui/react-northstar";
import { LikeIcon } from "@fluentui/react-icons-northstar";

interface IUpvotesProps {
    upvoteCount: string;
    isSelected: boolean;
}

const Upvotes: React.FunctionComponent<IUpvotesProps> = props => {

    return (
        <div className="like-count-wrapper" >
            <Text className="like-count-text" content={props.upvoteCount} title={props.upvoteCount} size="small" />
            {!props.isSelected ? <LikeIcon outline={true} className="vote-icon" /> : <LikeIcon outline={false} className=" vote-icon-filled" />}
        </div>
    );
}

export default React.memo(Upvotes);