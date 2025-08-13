'use client'

import { useRouter } from 'next/navigation'
import { useQuestionnaireStore } from '~/store'
import { questions } from '~/questions'
import { useEffect, useState } from 'react'

export default function SummaryPage() {
  const router = useRouter()
  const { responses, resetQuestionnaire } = useQuestionnaireStore()
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const totalQuestions = questions.length
  const answeredQuestions = Object.keys(responses).length
  const averageScore = answeredQuestions > 0 
    ? (Object.values(responses).reduce((sum, score) => sum + score, 0) / answeredQuestions).toFixed(1)
    : '0'

  const handleStartOver = () => {
    resetQuestionnaire()
    router.push('/')
  }

  useEffect(() => {
    if (isClient && answeredQuestions === 0) {
      router.push('/')
    }
  }, [isClient, answeredQuestions, router])

  if (!isClient || answeredQuestions === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-50 p-4 sm:p-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Questionnaire Summary
          </h1>
          <div className="text-base sm:text-lg text-gray-600 mb-2">
            You completed {answeredQuestions} out of {totalQuestions} questions
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-blue-600">
            Average Score: {averageScore}/7
          </div>
        </div>

        {/* Responses */}
        <div className="p-4 sm:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Your Responses</h2>
          <div className="space-y-3 sm:space-y-4 max-h-96 sm:max-h-[500px] overflow-y-auto">
            {questions.map((question, index) => {
              const questionId = index + 1
              const response = responses[questionId]
              
              return (
                <div 
                  key={questionId}
                  className={`p-3 sm:p-4 rounded-lg border ${
                    response ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {response ? (
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                          {response}
                        </div>
                      ) : (
                        <div className="bg-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                          -
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium block mb-1">
                        Question {questionId}:
                      </span>
                      <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{question}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleStartOver}
              className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 active:bg-blue-700 transition-colors"
            >
              Start Over
            </button>
            
            <button
              onClick={() => router.push('/question/1')}
              className="w-full sm:w-auto px-6 py-3 text-blue-600 border border-blue-500 rounded-lg font-semibold hover:bg-blue-50 active:bg-blue-100 transition-colors"
            >
              Continue Questionnaire
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}