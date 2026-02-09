import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const ChatInput = ({ input, onInputChange, onSubmit }: any) => {
	return (
		<form
			onSubmit={onSubmit}
			className="flex items-center w-full rounded-full shadow-md p-2 border border-gray-200" //
		>
			<Input
				value={input}
				onChange={onInputChange}
				placeholder="Ask anything!"
				className="focus:outline-none border-none focus-visible:ring-0 bg-transparent focus-visible:ring-offset-0 flex-1 p-2 rounded-full text-gray-800 placeholder-gray-400"
			/>

			<Button
				type="submit"
				className="ml-3 p-2 rounded-full bg-[#B0DB9C] hover:bg-[#A0C49D] transition cursor-pointer"
				disabled={!input}
			>
				<Send className="w-5 h-5" color="#075B5E" />
			</Button>
		</form>
	);
};

export default ChatInput;
