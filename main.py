from dotenv import load_dotenv
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain.agents import create_tool_calling_agent, AgentExecutor

load_dotenv()

class ResearchResponse(BaseModel):
    topic: str
    summary: str
    sources: list[str]
    tools: list[str]



# Comment out models you don't have valid API keys for
#llm = ChatOpenAI(model="gpt-4o-mini")
# llm2 = ChatAnthropic(model="claude-3-5-sonnet-20241022")
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key="AIzaSyAKU_Pdgeoyb-20WAZgE-QkWAW7OxurQvo"
)

parser = PydanticOutputParser(pydantic_object=ResearchResponse)

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
        you are a reasearch assistant that will help me genrate reasearch paper.
        Answer the user query and use necessary tools .
        Wrap the output in this formart and provide no other text\n{format_instructions}
        """
        
    ),
    ("placeholder", "{chat_history}"),
    ("human","{query}"),
    ("placeholder", "{agent_scratchpad}"),
]
).partial(format_instructions=parser.get_format_instructions())

agent = create_tool_calling_agent(
    llm=llm,
    prompt=prompt,
    tools=[]
    
)
agent_executor = AgentExecutor(agent=agent, tools=[], verbose=True)
raw_response = agent_executor.invoke({
    "query": "what tech stack was used to build you",
    "chat_history": []
})

try:
    structured_response = parser.parse(raw_response.get("output")[0]["text"])
except Exception as e:
    print("Error parsing response:", e,"\nRaw response:", raw_response )
    

print(structured_response)
