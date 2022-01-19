import { Remark } from 'react-remark';



function InlineFragment({children}){
  return <span>{children}</span>
}


export default function MarkdownFragment({text}){
  return(<Remark rehypeReactOptions={{
    components:{
    p: InlineFragment
  }
  }}>{text}</Remark>)

}

