'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuestionnaireStore } from '~/store'
import { questions } from '~/questions'
import ScaleSelector from '~/components/ScaleSelector'

export default function QuestionPage() {
  const params = useParams()
  const router = useRouter()
  const questionId = parseInt(params.id as string)
  
  const { responses, setResponse } = useQuestionnaireStore()
  
  if (questionId < 1 || questionId > questions.length) {
    router.push('/')
    return null
  }

  const question = questions[questionId - 1]
  const currentResponse = responses[questionId]

  const handleNext = () => {
    if (questionId < questions.length) {
      router.push(`/question/${questionId + 1}`)
    } else {
      router.push('/summary')
    }
  }

  const handlePrevious = () => {
    if (questionId > 1) {
      router.push(`/question/${questionId - 1}`)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with progress */}
          <div className="bg-blue-50 p-4 sm:p-6">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-blue-700 font-medium">
                  Question {questionId} of {questions.length}
                </span>
                <span className="text-sm text-blue-600">
                  {Math.round((questionId / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(questionId / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question content */}
          <div className="p-4 sm:p-8">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-8 sm:mb-12 text-center leading-relaxed px-2">
              {question}
            </h1>

            <div className="mb-8 sm:mb-12">
              <ScaleSelector 
                value={currentResponse}
                onChange={(value) => setResponse(questionId, value)}
              />
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="bg-gray-50 p-4 sm:p-6">
            <div className="flex justify-between space-x-4">
              <button
                onClick={handlePrevious}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
              >
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={!currentResponse}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                  currentResponse
                    ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {questionId < questions.length ? 'Next' : 'Finish'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}