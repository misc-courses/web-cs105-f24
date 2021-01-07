import React from 'react';
import remark from 'remark';
import remark2react from 'remark-react';


function InlineFragment({children}){
  return <span>{children}</span>
}


export default function MarkdownFragment({text}){
  return remark()
        .use(remark2react, { fragment: React.Fragment, remarkReactComponents:{
            p: InlineFragment
        } })
        .processSync(text).result;
}