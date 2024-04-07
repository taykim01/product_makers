import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";
import OpenAI from "openai";

export default class OpenAIService {
  async getQuoteKeyPhrases(quoteKeyPhrasesPrompt: string): Promise<CodeResponse> {
    const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY, dangerouslyAllowBrowser: true});
      
    try {
      const response = await openai.chat.completions.create({  // const response = await openai.chat.completions.create
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: "You are an expert teacher who quotes sentences from a given raw text. User will require you to quote sentences from a raw text."
            +"\n\n- Do NOT change the text.\n- Do NOT summarize.\n- Whenever the text contains \' or \", convert them into \\\' or \\\"\n- Try to quotes LONGER sentences.\n- Ignore topics or titles such as: \"사회규범 vs 법규범의 공통점과 차이점\", \"폭력은 정당화 될 수 있는가?\"\n\nYour output must be in a form javascript arrays of sentences."
            +"\n\n###For Example###"
            +"\nrawText = The most important aspect of yourself is your self. To discover where this sense of self"
            +"\narises, neuroscientists have explored the brain activity that underlies our constant sense of"
            +"\nbeing oneself. Most studies suggest an important role for the right hemisphere (van Veluw"
            +"\n& Chance, 2014). Put yours to sleep (with an anesthetic to your right carotid artery) and"
            +"\nself-concept"
            +"\nWhat we know and believe about"
            +"\nourselves."
            +"\nyou may have trouble recognizing your own face. One patient with right hemisphere damage"
            +"\nfailed to recognize that he owned and was controlling his left hand (Decety & Sommerville,"
            +"\n2003). The “medial prefrontal cortex,” a neuron path located in the cleft between"
            +"\nyour brain hemispheres just behind your eyes, seemingly helps stitch together your sense"
            +"\nof self. It becomes more active when you think about yourself (Farb et al., 2007; Heleven"
            +"\n& Van Overwalle, 2019; Zimmer, 2005). Despite the many ways we adapt our behavior,"
            +"\nmost people believe that they have a true self that is unchangeable (Christy et al., 2019)."
            +"\nThe elements of your self-concept, the specific beliefs by which you define yourself, are"
            +"\nyour self-schemas (Markus & Wurf, 1987). Schemas are mental templates by which we"
            +"\norganize our worlds. Our self-schemas — our perceiving ourselves as athletic, overweight,"
            +"\nsmart, or anything else — powerfully affect how we perceive, remember, and evaluate other"
            +"\npeople and ourselves. If being an athlete is one of your self-schemas, then you will tend to"
            +"\nnotice others’ bodies and skills, will quickly recall sports-related experiences, and will welcome"
            +"\ninformation that is consistent with your self-schema as an athlete (Kihlstrom & Cantor,"
            +"\n1984). Because birthdays are within self-schemas, if your friend’s birthday is close to yours,"
            +"\nyou’ll be more likely to remember it (Kesebir & Oishi, 2010). The self-schemas that make"
            +"\nup our self-concepts help us organize and retrieve our experiences."            
            +"\nYour response should be: The \\\“medial prefrontal cortex,\\\” a neuron path located in the cleft between your brain hemispheres just behind your eyes, seemingly helps stitch together your sense of self.\", \"The elements of your self-concept, the specific beliefs by which you define yourself, are your self-schemas\", \"Schemas are mental templates by which we organize our worlds." },
            { role: 'user', content: quoteKeyPhrasesPrompt },
          ],
        });
      const answer = response.choices[0].message.content;

      return new CodeResponse(
        Result.SUCCESS,
        "성공적으로 quoteList를 받아왔습니다.",
        answer
      );
    } catch (error) {
      return new CodeResponse(
        Result.ERROR,
        "quoteList를 받아오는 과정에서 에러가 발생했습니다.",
        error
      );
    }
  }

  async getQuestion(prompt: string): Promise<CodeResponse> {
    const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY, dangerouslyAllowBrowser: true});
      
    try {
      const response = await openai.chat.completions.create({  // const response = await openai.chat.completions.create
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: "You are an expert teacher who extracts keywords from given sentences. User will require you to quote sentences from a raw text."
            +"\n\n- Whenever the text contains \' or \", convert them into \\\' or \\\"\n- - If there is a list of words such as \"Three logical operators: and, or, and not\", try extracting the whole list into a keyword such as: \"and, or, and not\".\n\nYour output must be in a form of JSON array.\nkeywordList length MUST match the length of quoteList."
            +"\n\n###For Example###"            
            +"\n\nIf quoteList is:  [\"The \\\“medial prefrontal cortex,\\\” a neuron path located in the cleft between your brain hemispheres just behind your eyes, seemingly helps stitch together your sense of self.\", \"The elements of your self-concept, the specific beliefs by which you define yourself, are your self-schemas\", \"Schemas are mental templates by which we organize our worlds.\"]"
            +"\n\nYour response must be: \"medial prefrontal cortex\",\"self-concept\",\"schemas\" in JSON array format." },
            { role: 'user', content: prompt },
          ],
        });
      const answer = response.choices[0].message.content;

      return new CodeResponse(
        Result.SUCCESS,
        "성공적으로 keywordList를 받아왔습니다.",
        answer
      );
    } catch (error) {
      return new CodeResponse(
        Result.ERROR,
        "keywordList를 받아오는 과정에서 에러가 발생했습니다.",
        error
      );
    }
  }
}