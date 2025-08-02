import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to your LMS assistant! I\'m here to help you navigate courses, manage your account, track progress, and answer any questions you may have. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clearHistoryTimer = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Clear chat history after 1 hour
    if (clearHistoryTimer.current) {
      clearTimeout(clearHistoryTimer.current);
    }
    
    clearHistoryTimer.current = setTimeout(() => {
      setMessages([{
        id: '1',
        text: 'Welcome to your LMS assistant! I\'m here to help you navigate courses, manage your account, track progress, and answer any questions you may have. How can I assist you today?',
        isUser: false,
        timestamp: new Date()
      }]);
    }, 3600000); // 1 hour = 3600000ms

    return () => {
      if (clearHistoryTimer.current) {
        clearTimeout(clearHistoryTimer.current);
      }
    };
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Course and Class related queries
    if (message.includes('course') || message.includes('class') || message.includes('subject') || message.includes('lesson')) {
      if (message.includes('how') || message.includes('access') || message.includes('find')) {
        return 'Navigate to the Courses section to access all your enrolled courses. You can view course materials, track progress, and join live classes from the Classes tab.';
      }
      if (message.includes('progress') || message.includes('completion')) {
        return 'Your course progress is available in the Dashboard with completion percentages, upcoming deadlines, and detailed metrics for each course.';
      }
      return 'Access your courses from the Courses section and view upcoming classes in the Classes tab. Your progress is tracked in the Dashboard.';
    }
    
    // Payment and Fee related queries
    if (message.includes('payment') || message.includes('fee') || message.includes('money') || message.includes('bill') || message.includes('invoice')) {
      if (message.includes('history') || message.includes('past') || message.includes('previous')) {
        return 'Your complete payment history is available in the Payment section, including downloadable invoices and transaction details.';
      }
      if (message.includes('pending') || message.includes('due') || message.includes('outstanding')) {
        return 'View and pay outstanding dues in the Payment section. All pending amounts are displayed with due dates and secure payment options.';
      }
      return 'Manage all payment-related activities in the Payment section, including history, pending dues, and secure online payments.';
    }
    
    // Profile and Account related queries
    if (message.includes('profile') || message.includes('account') || message.includes('personal') || message.includes('information')) {
      if (message.includes('update') || message.includes('change') || message.includes('edit')) {
        return 'Update your personal information, contact details, and preferences in the Profile section. Remember to save your changes.';
      }
      if (message.includes('certificate') || message.includes('achievement')) {
        return 'Download certificates and view achievements in the Profile section under your academic credentials.';
      }
      return 'Manage your account settings, personal information, and view certificates in the Profile section.';
    }
    
    // Help and Support related queries
    if (message.includes('help') || message.includes('support') || message.includes('problem') || message.includes('issue') || message.includes('trouble')) {
      if (message.includes('ticket') || message.includes('complaint')) {
        return 'Submit a support ticket in the Tickets section for personalized assistance. Our team responds within 24 hours.';
      }
      if (message.includes('faq') || message.includes('question')) {
        return 'Find instant answers in our FAQ section covering technical issues, course access, payments, and platform features.';
      }
      return 'Get support through our Help Center, FAQ section, or by creating a support ticket for personalized assistance.';
    }
    
    // Attendance related queries
    if (message.includes('attendance') || message.includes('present') || message.includes('absent') || message.includes('participate')) {
      if (message.includes('percentage') || message.includes('rate') || message.includes('score')) {
        return 'Your attendance percentage is automatically calculated in the Attendance section, including class participation and assignment submissions.';
      }
      if (message.includes('improve') || message.includes('increase')) {
        return 'Improve attendance by joining live classes, completing assignments on time, and participating in discussions and quizzes.';
      }
      return 'View your attendance records and participation metrics in the Attendance section with improvement insights.';
    }
    
    // Notification related queries
    if (message.includes('notification') || message.includes('alert') || message.includes('reminder') || message.includes('update')) {
      if (message.includes('turn off') || message.includes('disable') || message.includes('stop')) {
        return 'Customize notification preferences in Settings to control email, SMS, and in-app alerts for classes and assignments.';
      }
      return 'Stay informed with notifications for upcoming classes, assignment deadlines, and important course updates in the Notifications section.';
    }
    
    // Community related queries
    if (message.includes('community') || message.includes('discussion') || message.includes('forum') || message.includes('peer') || message.includes('student')) {
      if (message.includes('post') || message.includes('ask') || message.includes('question')) {
        return 'Engage with peers in the Community section by posting questions, sharing knowledge, and participating in discussions.';
      }
      return 'Connect with fellow students in the Community section for discussions, knowledge sharing, and peer support.';
    }
    
    // Technical issues
    if (message.includes('login') || message.includes('password') || message.includes('access') || message.includes('technical')) {
      return 'For login issues, try resetting your password or clearing browser cache. Contact support with your registered email if problems persist.';
    }
    
    // Assignment and homework queries
    if (message.includes('assignment') || message.includes('homework') || message.includes('task') || message.includes('submit')) {
      return 'Access assignments in your course modules with due dates, submission guidelines, and real-time grade tracking.';
    }
    
    // Quiz and exam queries
    if (message.includes('quiz') || message.includes('exam') || message.includes('test') || message.includes('assessment')) {
      return 'Take quizzes and exams through your course dashboard. Results and detailed feedback are available immediately after completion.';
    }
    
    // Schedule and timing queries
    if (message.includes('schedule') || message.includes('time') || message.includes('when') || message.includes('timing')) {
      return 'View your complete schedule in the Classes section, including live sessions, assignment deadlines, and exam dates.';
    }
    
    // Greetings and general conversation
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
      return 'Hello <span class="animate-wave inline-block">👋</span>! I\'m your LMS assistant, ready to help you navigate the platform and answer any questions about your courses. How may I assist you?';
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re welcome! I\'m here to assist you with any questions about courses, platform features, or technical support.';
    }
    
    if (message.includes('bye') || message.includes('goodbye')) {
      return 'Thank you for using the LMS assistant. Have a productive learning experience, and feel free to reach out anytime you need help!';
    }
    
    // AI-like responses for any other questions
    const aiResponses = [
      'Based on your query, I understand you\'re looking for information. Let me help you find the right section in your LMS platform.',
      'I\'m analyzing your question to provide the most relevant assistance. For specific features, please check the corresponding sections in your dashboard.',
      'Thank you for your question. I\'m here to guide you through the LMS platform and help you find exactly what you need.',
      'I understand your inquiry. Let me direct you to the appropriate resources within your learning management system.',
      'Your question is important to me. I\'ll help you navigate to the right section where you can find detailed information.',
      'I\'m processing your request to provide you with the most accurate guidance for your LMS experience.',
      'Based on your input, I can help you explore the relevant features in your learning platform. What specific area would you like to focus on?',
      'I appreciate your question. Let me assist you in finding the information you need within the LMS system.',
      'Your inquiry has been noted. I\'m here to help you make the most of your learning management system experience.',
      'Thank you for reaching out. I\'ll guide you to the appropriate section where you can find comprehensive information about your query.'
    ];
    
    // Return random AI-like response
    return aiResponses[Math.floor(Math.random() * aiResponses.length)] + ' I can assist you with: Courses & Classes, Payments & Billing, Profile Management, Attendance Records, Notifications, Community Discussions, Assignments & Assessments, and Technical Support. What would you like to know?';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-17 right-3 z-[9999]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white p-3 rounded-full animate-professional hover:scale-105 hover:shadow-2xl"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div 
          className="bg-[#ebeff3] rounded-lg w-80 h-96 flex flex-col"
          style={{
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px,
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `
          }}
        >
          <div className="bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white p-4 rounded-t-lg flex justify-between items-center ">
            <h3 className="font-semibold">LMS Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:opacity-80 p-1 rounded"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white'
                      : 'bg-white text-gray-800'
                  }`}
                  style={!message.isUser ? {
                    boxShadow: `
                      rgba(255, 255, 255, 0.7) -2px -2px 2px,
                      rgba(189, 194, 199, 0.75) 2px 2px 2px
                    `
                  } : {}}
                >
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.text }}></p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none"
                style={{
                  boxShadow: `
                    rgba(255, 255, 255, 0.7) -2px -2px 2px inset,
                    rgba(189, 194, 199, 0.75) 2px 2px 2px inset
                  `
                }}
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white p-2 rounded-lg transition-all hover:scale-105"
                style={{
                  boxShadow: `
                    rgba(255, 255, 255, 0.7) -2px -2px 2px,
                    rgba(189, 194, 199, 0.75) 2px 2px 2px
                  `
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;