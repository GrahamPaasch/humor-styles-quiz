'use client'

import { useRouter } from 'next/navigation'
import { useQuestionnaireStore } from '~/store'

export default function Home() {
  const router = useRouter()
  const { responses, resetQuestionnaire } = useQuestionnaireStore()
  
  const answeredQuestions = Object.keys(responses).length
  const hasStarted = answeredQuestions > 0

  const handleStart = () => {
    router.push('/question/1')
  }

  const handleContinue = () => {
    const nextUnanswered = findNextUnansweredQuestion()
    if (nextUnanswered) {
      router.push(`/question/${nextUnanswered}`)
    } else {
      router.push('/summary')
    }
  }

  const findNextUnansweredQuestion = () => {
    for (let i = 1; i <= 32; i++) {
      if (!responses[i]) {
        return i
      }
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-50 p-6 sm:p-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            Humor Questionnaire
          </h1>
          
          <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
            This questionnaire contains 32 statements about humor and your approach to it. 
            For each statement, please indicate how much you agree or disagree using a scale from 1 to 7.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="mb-6 sm:mb-8">
            <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
              <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                <span className="text-center">1<br />Totally<br />Disagree</span>
                <span className="text-center">7<br />Totally<br />Agree</span>
              </div>
            </div>
          </div>

          {hasStarted && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm sm:text-base text-blue-800 font-medium">
                  Progress: {answeredQuestions} of 32 questions
                </p>
                <span className="text-sm text-blue-600 font-semibold">
                  {Math.round((answeredQuestions / 32) * 100)}%
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredQuestions / 32) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-3 sm:space-y-4">
            {!hasStarted ? (
              <button
                onClick={handleStart}
                className="w-full px-6 py-4 bg-blue-500 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-lg"
              >
                Start Questionnaire
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleContinue}
                  className="w-full px-6 py-4 bg-blue-500 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-lg"
                >
                  Continue Questionnaire
                </button>
                
                <button
                  onClick={() => router.push('/summary')}
                  className="w-full px-6 py-3 text-blue-600 border border-blue-500 rounded-lg font-semibold hover:bg-blue-50 active:bg-blue-100 transition-colors"
                >
                  View Summary
                </button>
                
                <button
                  onClick={() => {
                    resetQuestionnaire()
                    handleStart()
                  }}
                  className="w-full px-6 py-3 text-gray-600 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
