"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownCircleIcon, BotMessageSquare, Loader, Loader2, Send, X } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatInput from "./ChatInput";

export default function ChatBot() {
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [showChatIcon, setShowChatIcon] = useState(false);
	const chatIconRef = useRef<HTMLButtonElement>(null);

	const { messages, input, handleInputChange, handleSubmit, stop, reload, status, error } =
		useChat({
			api: "/api/chat",
		});

	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			// if (window.scrollY > 0) {
			// 	setShowChatIcon(true);
			// } else {
			// 	setShowChatIcon(false);
			// 	setIsChatOpen(false);
			// }

			setShowChatIcon(true);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const toggleChat = () => {
		setIsChatOpen(!isChatOpen);
	};

	useEffect(() => {
		if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div>
			<AnimatePresence>
				{showChatIcon && (
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 100 }}
						transition={{ duration: 0.3 }}
						className="fixed bottom-4 right-4 z-50"
					>
						<Button
							ref={chatIconRef}
							onClick={toggleChat}
							size="icon"
							className="rounded-full size-12 p-2 shadow-xl cursor-pointer"
							title="ChatBot"
							aria-label="ChatBot"
						>
							{!isChatOpen ? (
								<BotMessageSquare className="size-6" />
							) : (
								<ArrowDownCircleIcon className="size-6" />
							)}
						</Button>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isChatOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.3 }}
						className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px]"
					>
						<Card className="border-2 shadow-xl">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
								<CardTitle>Chat with Giki</CardTitle>
								<Button
									onClick={toggleChat}
									variant="ghost"
									size="sm"
									className="px-2 py-0 cursor-pointer"
								>
									<X className="size-4" color="#c95534" />
									<span className="sr-only">Close</span>
								</Button>
							</CardHeader>
							<CardContent>
								<ScrollArea className="h-[350px] pr-4">
									{messages?.length == 0 && (
										<div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3">
											No messages yet
										</div>
									)}

									{messages?.map((message, index) => (
										<div
											key={index}
											className={`mb-4 ${
												message.role === "user" ? "text-right" : "text-left"
											}`}
										>
											<div
												className={`inline-block p-2 px-4 rounded-2xl ${
													message.role === "user"
														? "bg-[#B0DB9C] text-zinc-900" // Applied your desired accent color and white text
														: "bg-muted"
												}`}
											>
												<ReactMarkdown
													children={message.content}
													remarkPlugins={[remarkGfm]}
													components={{
														code({
															node,
															inline,
															className,

															children,
															...props
														}: any) {
															if (inline) {
																return (
																	<code
																		{...props}
																		className="bg-gray-200 px-1 rounded"
																	>
																		{children}
																	</code>
																);
															} else {
																return (
																	<pre
																		{...props}
																		className="bg-gray-200 p-2 rounded"
																	>
																		<code>{children}</code>
																	</pre>
																);
															}
														},
														ul: ({ children }) => (
															<ul className="list-disc ml-4">
																{children}
															</ul>
														),
														ol: ({ children }) => (
															<ol className="list-decimal ml-4">
																{children}
															</ol>
														),
													}}
												/>
											</div>
										</div>
									))}

									{(status === "submitted" || status === "streaming") && (
										<div className="w-full items-center flex justify-center gap-3">
											<Loader
												className="animate-spin h-5 w-5 text-primary"
												style={{
													animationDuration: "1.5s",
													animationTimingFunction: "ease-in-out",
												}}
											/>
											<button
												className="underline cursor-pointer"
												type="button"
												onClick={() => stop()}
												aria-label="Stop"
											></button>
										</div>
									)}

									{error && (
										<div className="w-full items-center flex justify-center gap-3">
											<div>An error occurred</div>
											<button
												className="underline"
												type="button"
												onClick={() => reload()}
											>
												try again
											</button>
										</div>
									)}

									<div ref={scrollRef}></div>
								</ScrollArea>
							</CardContent>
							<CardFooter>
								{/* <form
									onSubmit={handleSubmit}
									className="flex w-full items-center space-x-2"
								>
									<Input
										value={input}
										onChange={handleInputChange}
										placeholder="Type your message..."
										className="flex-1"
									/>
									<Button
										type="submit"
										className="size-9"
										disabled={status !== "ready"}
										size="icon"
									>
										<Send className="size-4" />
									</Button>
								</form> */}

								<ChatInput
									input={input}
									onInputChange={handleInputChange}
									onSubmit={handleSubmit}
								/>
							</CardFooter>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
