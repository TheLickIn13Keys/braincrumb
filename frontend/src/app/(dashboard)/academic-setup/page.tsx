
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, CheckCircle2 } from 'lucide-react'
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Textarea } from "@/src/components/ui/textarea"
import { useToast } from "@/src/hooks/common/useToast"
import { useAuth } from '@/src/hooks/common/useAuth'

const steps = [
  { id: 1, title: 'Welcome' },
  { id: 2, title: 'Personal Info' },
  { id: 3, title: 'Academic Background' },
  { id: 4, title: 'Class Selection' },
  { id: 5, title: 'Academic Questionnaire' },
  { id: 6, title: 'Complete' },
]

interface AcademicInfo {
  school: string
  grade: string
  previousClasses: string[]
  targetClass: string
}

export default function AcademicSetupFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [academicInfo, setAcademicInfo] = useState<AcademicInfo>({
    school: '',
    grade: '',
    previousClasses: [],
    targetClass: '',
  })
  const [questionnaire, setQuestionnaire] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { user, updateProfile } = useAuth()

  const generateQuestionnaire = () => {
    const targetClass = academicInfo.targetClass
    
    
    const questions = [
      {
        question: `How confident are you in ${targetClass}?`,
        options: ["Not at all confident", "Somewhat confident", "Very confident"]
      },
      {
        question: "How many hours per week can you dedicate to studying?",
        options: ["0-2 hours", "2-5 hours", "5+ hours"]
      },
      {
        question: "What is your preferred learning style?",
        options: ["Visual", "Auditory", "Reading/Writing", "Kinesthetic"]
      },
      {
        question: "Do you prefer to study alone or in groups?",
        options: ["Alone", "Small groups", "Either"]
      },
      {
        question: "How do you best retain information?",
        options: ["Taking notes", "Practice problems", "Teaching others", "Video tutorials"]
      }
    ]

    setQuestionnaire(questions)
  }

  const nextStep = async () => {
    if (currentStep === 4) {
      generateQuestionnaire()
    }

    if (currentStep === steps.length - 1) {
      setIsLoading(true)
      try {
        await updateProfile({ academicInfo })
        toast({
          title: "Profile Updated",
          description: "Your academic profile has been set up successfully!",
        })
        router.push('/dashboard')
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-2">Welcome to Braincrumb</CardTitle>
          <CardDescription className="text-center">
            Let's set up your academic profile and create a personalized learning roadmap!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.id === currentStep ? 'bg-pink-500 text-white' :
                    step.id < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id < currentStep ? <CheckCircle2 className="h-5 w-5" /> : step.id}
                </div>
                <span className="text-sm mt-2">{step.title}</span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          {currentStep === 1 && <WelcomeStep />}
          {currentStep === 2 && <PersonalInfoStep />}
          {currentStep === 3 && (
            <AcademicBackgroundStep
              academicInfo={academicInfo}
              setAcademicInfo={setAcademicInfo}
            />
          )}
          {currentStep === 4 && (
            <ClassSelectionStep
              academicInfo={academicInfo}
              setAcademicInfo={setAcademicInfo}
            />
          )}
          {currentStep === 5 && (
            <AcademicQuestionnaireStep 
              questionnaire={questionnaire}
              setQuestionnaire={setQuestionnaire}
            />
          )}
          {currentStep === 6 && <CompleteStep />}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1 || isLoading}
          >
            Back
          </Button>
          <Button 
            onClick={nextStep}
            disabled={isLoading}
          >
            {currentStep === steps.length - 1 ? (
              isLoading ? "Completing..." : "Complete"
            ) : (
              "Next"
            )}
            {currentStep !== steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function WelcomeStep() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Academic Journey!</h2>
      <p className="mb-4">
        Braincrumb is here to help you excel in your classes and achieve your academic goals.
      </p>
      <p>
        Let's get started by setting up your academic profile and identifying areas for improvement.
      </p>
    </div>
  )
}

function PersonalInfoStep() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Tell Us About Yourself</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="Enter your first name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Enter your last name" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email address" />
      </div>
    </div>
  )
}

function AcademicBackgroundStep({ 
  academicInfo,
  setAcademicInfo 
}: {
  academicInfo: AcademicInfo
  setAcademicInfo: (info: AcademicInfo) => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Academic Background</h2>
      <div className="space-y-2">
        <Label htmlFor="school">School Name</Label>
        <Input
          id="school"
          placeholder="Enter your school name"
          value={academicInfo.school}
          onChange={(e) => setAcademicInfo({ 
            ...academicInfo, 
            school: e.target.value 
          })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="grade">Current Grade/Year</Label>
        <Select
          value={academicInfo.grade}
          onValueChange={(value) => setAcademicInfo({ 
            ...academicInfo, 
            grade: value 
          })}
        >
          <SelectTrigger id="grade">
            <SelectValue placeholder="Select your current grade/year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9">9th Grade</SelectItem>
            <SelectItem value="10">10th Grade</SelectItem>
            <SelectItem value="11">11th Grade</SelectItem>
            <SelectItem value="12">12th Grade</SelectItem>
            <SelectItem value="freshman">College Freshman</SelectItem>
            <SelectItem value="sophomore">College Sophomore</SelectItem>
            <SelectItem value="junior">College Junior</SelectItem>
            <SelectItem value="senior">College Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="previousClasses">Previous Relevant Classes</Label>
        <Textarea
          id="previousClasses"
          placeholder="List any relevant classes you've taken (e.g., Algebra I, Biology, World History)"
          value={academicInfo.previousClasses.join(', ')}
          onChange={(e) => setAcademicInfo({
            ...academicInfo,
            previousClasses: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
          })}
        />
      </div>
    </div>
  )
}

function ClassSelectionStep({
  academicInfo,
  setAcademicInfo
}: {
  academicInfo: AcademicInfo
  setAcademicInfo: (info: AcademicInfo) => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Select Your Target Class</h2>
      <p className="mb-4">
        Choose the class you want to improve in. We'll create a personalized roadmap 
        to help you excel in this subject.
      </p>
      <div className="space-y-2">
        <Label htmlFor="targetClass">Target Class</Label>
        <Select
          value={academicInfo.targetClass}
          onValueChange={(value) => setAcademicInfo({
            ...academicInfo,
            targetClass: value
          })}
        >
          <SelectTrigger id="targetClass">
            <SelectValue placeholder="Select your target class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="algebra2">Algebra II</SelectItem>
            <SelectItem value="precalculus">Precalculus</SelectItem>
            <SelectItem value="calculus">Calculus</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
            <SelectItem value="biology">Biology</SelectItem>
            <SelectItem value="literature">Literature</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function AcademicQuestionnaireStep({
  questionnaire,
  setQuestionnaire
}: {
  questionnaire: any[]
  setQuestionnaire: (q: any[]) => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Academic Questionnaire</h2>
      <p className="mb-4">
        Please answer the following questions about your current knowledge and 
        confidence in various topics related to your target class.
      </p>
      {questionnaire.map((q, index) => (
        <div key={index} className="space-y-2">
          <Label htmlFor={`question-${index}`}>{q.question}</Label>
          <RadioGroup id={`question-${index}`}>
            {q.options.map((option: string, optionIndex: number) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option} 
                  id={`question-${index}-option-${optionIndex}`} 
                />
                <Label 
                  htmlFor={`question-${index}-option-${optionIndex}`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

function CompleteStep() {
  return (
    <div className="text-center">
      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4">You're All Set!</h2>
      <p className="mb-4">
        Thank you for completing your academic profile. We're excited to help you 
        excel in your studies!
      </p>
      <p>
        Your personalized learning roadmap is being generated based on your responses.
        You'll be redirected to your dashboard in a moment.
      </p>
    </div>
  )
}