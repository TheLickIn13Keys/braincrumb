from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from ....models.questionnaire import QuestionnaireResponse
from ....models.domain.user import User
from ..deps import get_current_user, get_db
from typing import List

router = APIRouter()

@router.post("/generate")
async def generate_questionnaire(
    target_class: str,
    current_user: User = Depends(get_current_user)
):
    
    
    questions = [
        {
            "question": f"How comfortable are you with {target_class}?",
            "options": ["Not at all", "Somewhat", "Very comfortable"]
        },
        {
            "question": "How many hours per week can you dedicate to studying?",
            "options": ["0-2 hours", "2-5 hours", "5+ hours"]
        },
        {
            "question": "What is your preferred learning style?",
            "options": ["Visual", "Auditory", "Reading/Writing", "Kinesthetic"]
        }
    ]
    return {"questions": questions}

@router.post("/submit", response_model=QuestionnaireResponse)
async def submit_questionnaire(
    responses: List[dict],
    target_class: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorClient = Depends(get_db)
):
    questionnaire_response = {
        "user_id": current_user.id,
        "target_class": target_class,
        "responses": responses
    }
    
    result = await db.questionnaire_responses.insert_one(questionnaire_response)
    created_response = await db.questionnaire_responses.find_one({"_id": result.inserted_id})
    
    return QuestionnaireResponse(**created_response)