import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import InputField from "./input_field";
import Layout from "./layout";
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Theme for the previous highlighter

// Codes highlighting funciton
/* May need to scrutinize everything in this function later. */
const mdComponents = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');

        return !inline && match ? (
            <SyntaxHighlighter style={oneDark} language={match[1]} {...props}>
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>{children}</code>
        );
    }
};

function Prompt({prompt}) {
	return(
		<Card className="max-w-1/2 ml-auto w-fit pt-3 pb-3">
			<CardContent>
				<div className="flex justify-end">
				{prompt}
				</div>
			</CardContent>
		</Card>
	)
}

function Response({response}) {
	return(
		<>
			<div className="pt-5 pb-5">
				<Markdown components={mdComponents}>
					{response}
				</Markdown>
			</div>
		</>
	)
}

export default function Conversation({history}) {	
	return (
		<Layout>
			<div className="fixed top-[6%] left-1/4 w-1/2 overflow-y-auto max-h-[74%]">
				{history.map((item, index) => 
				<div key={index}>
					{item.role == 'user'
						? <Prompt prompt={item.content} />
						: <Response response={item.content} />
					}
				</div>
				)}
			</div>

			<div className="fixed bottom-4 left-1/4 w-1/2 bg-background">
	        <InputField history={history}/> {/*form={form} onSubmit={onSubmit}/>*/}
	        </div>
		</Layout>

		// TO DO: multiple models support. error handling (API failures, rate limits). 
		// Streaming responses, System prompt customization, Token usage display,send confirmation mail after registering + redirect to a page saying a confirmation mail has been sent.
		// TO IMPROVE: Load each message into each row instead of an entire chat conversation into one row. Cap limit to guest's db storage (maybe clean after each day).
		// Rewrite the codes: put the layout on welcome.tsx and let it wrap out the pages instead (something something using app.tsx, i need to ask claude later)
	);
};