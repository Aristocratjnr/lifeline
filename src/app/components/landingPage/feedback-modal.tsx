"use client"

import { useState, useEffect, useMemo } from "react"
import { X } from "lucide-react"

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FeedbackData) => void
}

export interface FeedbackData {
  rating: number | null
  satisfactionReasons: string[]
  satisfiedParts: string[]
  additionalFeedback: string
}

const FeedbackModal = ({ isOpen, onClose, onSubmit }: FeedbackModalProps) => {
  const [rating, setRating] = useState<number | null>(null)
  const [satisfactionReasons, setSatisfactionReasons] = useState<string[]>([])
  const [satisfiedParts, setSatisfiedParts] = useState<string[]>([])
  const [additionalFeedback, setAdditionalFeedback] = useState("")
  const [animateIn, setAnimateIn] = useState(false)
  const [otherSatisfactionReason, setOtherSatisfactionReason] = useState("")
  const [otherSatisfiedPart, setOtherSatisfiedPart] = useState("")

  // Define different options based on rating
  const standardReasons = useMemo(() => [
    "Clear emergency instructions",
    "Easy to find resources",
    "Helpful safety tips",
    "Quick access to aid information",
    "Well-organized content",
    "Other",
  ], [])

  const highRatingReasons = useMemo(() => [
    "Comprehensive emergency guidance",
    "Life-saving information",
    "Excellent resource accessibility",
    "Critical safety features",
    "Essential aid contacts",
    "Other",
  ], [])

  // Get the appropriate reasons based on rating
  const currentReasons = rating !== null && rating >= 9 ? highRatingReasons : standardReasons

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setTimeout(() => setAnimateIn(true), 10)
    } else {
      document.body.style.overflow = "auto"
      setAnimateIn(false)
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])
  
  useEffect(() => {
    if (rating !== null) {
      const isHighRating = rating >= 9;
      // Check if we previously had a different category rating selected
      const wasHighRating = satisfactionReasons.some((reason) => 
        highRatingReasons.includes(reason) && !standardReasons.includes(reason)
      );

      // Only reset if we're switching between high/low categories AND have selections
      if (satisfactionReasons.length > 0 && 
          ((isHighRating && !wasHighRating) || (!isHighRating && wasHighRating))) {
        setSatisfactionReasons([]);
      }
    }
  }, [rating, highRatingReasons, standardReasons, satisfactionReasons])

  if (!isOpen) return null

  // Modify handleSatisfactionChange
  const handleSatisfactionChange = (reason: string) => {
    console.log("Trying to change reason:", reason, "Current rating:", rating);
    if (satisfactionReasons.includes(reason)) {
      setSatisfactionReasons(satisfactionReasons.filter((item) => item !== reason));
      if (reason === "Other") {
        setOtherSatisfactionReason("");
      }
    } else {
      if (satisfactionReasons.length < 3) {
        setSatisfactionReasons([...satisfactionReasons, reason]);
      }
    }
  }

  // Modify handleSatisfiedPartsChange
  const handleSatisfiedPartsChange = (part: string) => {
    if (satisfiedParts.includes(part)) {
      setSatisfiedParts(satisfiedParts.filter((item) => item !== part))
      if (part === "Other") {
        setOtherSatisfiedPart("")
      }
    } else {
      if (satisfiedParts.length < 3) {
        setSatisfiedParts([...satisfiedParts, part])
      }
    }
  }

  // Update the submission data
  const handleSubmit = () => {
    onSubmit({
      rating,
      satisfactionReasons: satisfactionReasons.map(reason => 
        reason === "Other" ? `Other: ${otherSatisfactionReason}` : reason
      ),
      satisfiedParts: satisfiedParts.map(part => 
        part === "Other" ? `Other: ${otherSatisfiedPart}` : part
      ),
      additionalFeedback,
    })
  }

  const handleClose = () => {
    setAnimateIn(false)
    setTimeout(() => onClose(), 300)
  }

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-6 transition-opacity duration-300"
      style={{ opacity: animateIn ? 1 : 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-[85%] md:max-w-[600px] max-h-[90vh] overflow-y-auto shadow-xl transition-transform duration-300"
        style={{ transform: animateIn ? "translateY(0)" : "translateY(20px)" }}
      >
        <div className="p-4 sm:p-6 md:p-8 relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 p-1"
            aria-label="Close feedback modal"
          >
            <X size={24} />
          </button>

          <div className="space-y-6 md:space-y-8 pt-2">
            {/* Rating Section */}
            <div className="space-y-2 sm:space-y-4">
              <h3 className="font-medium text-sm sm:text-base">
                <span className="text-red-500 mr-1">*</span>
                What is your overall rating for this page?
              </h3>

              <div className="flex flex-col space-y-1 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                  <span>Very dissatisfied</span>
                  <span>Very satisfied</span>
                </div>

                <div className="flex justify-between gap-1 sm:gap-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleRatingChange(value)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-xs sm:text-sm font-medium transition-colors
                        ${rating === value ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Satisfaction Reasons */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-medium text-sm sm:text-base">
                <span className="text-red-500 mr-1">*</span>
                What makes you satisfied with this page?
              </h3>
              <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500">(Select no more than 3 items)</p>

              <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                {currentReasons.map((reason) => (
                  <div key={reason} className="flex flex-col gap-1">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id={`reason-${reason}`}
                        checked={satisfactionReasons.includes(reason)}
                        onChange={() => handleSatisfactionChange(reason)}
                        disabled={satisfactionReasons.length >= 3 && !satisfactionReasons.includes(reason)}
                        className="mt-0.5 h-5 w-5 border-gray-300 text-gray-500 focus:ring-0 focus:ring-offset-0 accent-gray-500"
                      />
                      <label htmlFor={`reason-${reason}`} className="text-gray-700 text-[11px] xs:text-xs sm:text-sm">
                        {reason}
                      </label>
                    </div>
                    {reason === "Other" && satisfactionReasons.includes("Other") && (
                      <input
                        type="text"
                        value={otherSatisfactionReason}
                        onChange={(e) => setOtherSatisfactionReason(e.target.value)}
                        placeholder="Please specify"
                        className="ml-7 p-1 text-base sm:text-xs border-b border-gray-300 focus:outline-none focus:border-gray-400"
                        maxLength={50}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Satisfied Parts */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-medium text-sm sm:text-base">
                <span className="text-red-500 mr-1">*</span>
                Which part of this page are you satisfied with?
              </h3>
              <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500">(Select no more than 3 items)</p>

              <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                {[
                  "User interface design",
                  "Navigation ease",
                  "Resource organization",
                  "Emergency contacts section",
                  "Safety guidelines",
                  "Other",
                ].map((part) => (
                  <div key={part} className="flex flex-col gap-1">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id={`part-${part}`}
                        checked={satisfiedParts.includes(part)}
                        onChange={() => handleSatisfiedPartsChange(part)}
                        disabled={satisfiedParts.length >= 3 && !satisfiedParts.includes(part)}
                        className="mt-0.5 h-5 w-5 border-gray-300 text-gray-500 focus:ring-0 focus:ring-offset-0 accent-gray-500"
                      />
                      <label htmlFor={`part-${part}`} className="text-gray-700 text-[11px] xs:text-xs sm:text-sm">
                        {part}
                      </label>
                    </div>
                    {part === "Other" && satisfiedParts.includes("Other") && (
                      <input
                        type="text"
                        value={otherSatisfiedPart}
                        onChange={(e) => setOtherSatisfiedPart(e.target.value)}
                        placeholder="Please specify"
                        className="ml-7 p-1 text-base sm:text-xs border-b border-gray-300 focus:outline-none focus:border-gray-400"
                        maxLength={50}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Feedback */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-medium text-sm sm:text-base">Tell us more about your experience.</h3>

              <textarea
                value={additionalFeedback}
                onChange={(e) => setAdditionalFeedback(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 xs:p-3 min-h-[60px] xs:min-h-[80px] sm:min-h-[100px] focus:outline-none focus:ring-1 focus:ring-gray-400 text-base sm:text-xs bg-gray-100"
                placeholder="Your feedback helps us improve"
                maxLength={200}
              />
              <div className="flex justify-end">
                <span className="text-[10px] xs:text-xs text-gray-500">{additionalFeedback.length}/200</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4 sm:mt-6 w-full">
              <button
                onClick={handleSubmit}
                className="w-full max-w-[400px] bg-gray-400 text-white px-6 sm:px-12 py-3 rounded-full hover:bg-gray-700 transition-colors text-sm font-bold"
                disabled={!rating || satisfactionReasons.length === 0 || satisfiedParts.length === 0}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
