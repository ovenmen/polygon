import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';

import { fetcher } from './fetcher';
import { cookie } from './cookies';

export const TOOLS = {
    embed: Embed,
    table: Table,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: {
        class: Image,
        config: {
            // field: 'file',
            uploader: {
                uploadByFile: async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await fetch('http://localhost:5000/api/upload/files', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${cookie.get('accessToken')}`
                        },
                        body: formData
                    });

                    return await response.json();
                },
                uploadByUrl: async (url) => {
                    const formData = new FormData();
                    formData.append('url', url);

                    const response = await fetch('http://localhost:5000/api/upload/files', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${cookie.get('accessToken')}`
                        },
                        body: formData
                    });

                    return await response.json();
                },
            }
        }
    },
    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage
};
