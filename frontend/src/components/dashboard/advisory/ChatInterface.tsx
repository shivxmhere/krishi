'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image as ImageIcon, Mic, Paperclip, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    attachments?: string[];
    isStreaming?: boolean;
}

export const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Hello! I\'m your AI agricultural assistant. Upload a photo of your crop or ask me anything about farming, diseases, or treatments.',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response with streaming effect
        const responseId = (Date.now() + 1).toString();
        const fullResponse = "Based on your description, this sounds like early blight. I recommend applying a copper-based fungicide and ensuring proper spacing between plants for airflow. Would you like me to analyze a photo of the affected area?";

        setMessages(prev => [...prev, {
            id: responseId,
            role: 'assistant',
            content: '',
            timestamp: new Date(),
            isStreaming: true
        }]);

        // Stream the response
        let currentText = '';
        for (let i = 0; i < fullResponse.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 30));
            currentText += fullResponse[i];
            setMessages(prev => prev.map(m =>
                m.id === responseId ? { ...m, content: currentText } : m
            ));
        }

        setMessages(prev => prev.map(m =>
            m.id === responseId ? { ...m, isStreaming: false } : m
        ));
        setIsTyping(false);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Krishi AI Assistant</h3>
                        <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Online
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                        <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                        History
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence>
                    {messages.map((message, index) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            {/* Avatar */}
                            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${message.role === 'assistant'
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                                    : 'bg-gray-200 dark:bg-gray-700'
                                }`}>
                                {message.role === 'assistant' ? (
                                    <Bot className="w-5 h-5 text-white" />
                                ) : (
                                    <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                )}
                            </div>

                            {/* Message bubble */}
                            <div className={`max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`rounded-2xl px-4 py-3 ${message.role === 'assistant'
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                        : 'bg-green-600 text-white'
                                    }`}>
                                    <p className="leading-relaxed">{message.content}</p>
                                    {message.isStreaming && (
                                        <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
                                    )}
                                </div>

                                <span className="text-xs text-gray-400 mt-1 block">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-gray-400"
                    >
                        <div className="flex gap-1">
                            <motion.span
                                className="w-2 h-2 rounded-full bg-gray-400"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                            />
                            <motion.span
                                className="w-2 h-2 rounded-full bg-gray-400"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                            />
                            <motion.span
                                className="w-2 h-2 rounded-full bg-gray-400"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                            />
                        </div>
                        <span className="text-sm">AI is thinking...</span>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-end gap-2 bg-gray-50 dark:bg-gray-800 rounded-2xl p-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                    </Button>

                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Ask about diseases, treatments, or upload an image..."
                        className="min-h-[44px] max-h-32 bg-transparent border-0 focus-visible:ring-0 resize-none"
                        rows={1}
                    />

                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ImageIcon className="w-5 h-5 text-gray-500" />
                    </Button>

                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Mic className="w-5 h-5 text-gray-500" />
                    </Button>

                    <Button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="rounded-full bg-green-600 hover:bg-green-700 px-4"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>

                <p className="text-xs text-gray-400 text-center mt-2">
                    AI can make mistakes. Always verify critical information with agricultural experts.
                </p>
            </div>
        </div>
    );
};
