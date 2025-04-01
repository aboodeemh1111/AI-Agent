from dotenv import load_dotenv
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain.agents import create_tool_calling_agent, AgentExecutor
from tools import search_tool, wiki_tool, save_tool

load_dotenv()

class ResearchResponse(BaseModel):
    topic: str
    summary: str
    sources: list[str]
    tools: list[str]

def get_research_response(query):
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        google_api_key="AIzaSyAKU_Pdgeoyb-20WAZgE-QkWAW7OxurQvo"
    )

    parser = PydanticOutputParser(pydantic_object=ResearchResponse)

    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            """
            You are a research assistant that will help generate research papers.
            Answer the user query and use necessary tools.
            Wrap the output in this format and provide no other text\n{format_instructions}
            """
        ),
        ("placeholder", "{chat_history}"),
        ("human", "{query}"),
        ("placeholder", "{agent_scratchpad}"),
    ]).partial(format_instructions=parser.get_format_instructions())

    tools = [search_tool, wiki_tool, save_tool]

    agent = create_tool_calling_agent(
        llm=llm,
        prompt=prompt,
        tools=tools
    )
    
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
    
    raw_response = agent_executor.invoke({
        "query": query,
        "chat_history": []
    })

    try:
        structured_response = parser.parse(raw_response["output"])
        return structured_response.dict()
    except Exception as e:
        print(f"Error parsing response: {e}")
        print(f"Raw response: {raw_response}")
        return {"error": str(e), "raw_response": raw_response}

# This allows the script to be run directly for testing
if __name__ == "__main__":
    query = input("Enter your query: ")
    result = get_research_response(query)
    print(result)
