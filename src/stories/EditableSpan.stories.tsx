import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";

import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Task} from "../Task";
import {EditableSpan} from "../EditableSpan";



// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        value: {
            description: 'Start value empty. Add value push button set string.'
        },
        onChange: {
            description: 'Value EditableSpan changed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
    args: {
        onChange: action('Value EditableSpan changed'),
        value: 'HTML'
    }
};

