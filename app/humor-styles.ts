export interface HumorStyle {
  id: string
  name: string
  description: string
  color: string
}

export const humorStyles: HumorStyle[] = [
  {
    id: 'affiliative',
    name: 'Affiliative',
    description: 'Friendly, inclusive jokes that build social bonds',
    color: 'bg-green-500'
  },
  {
    id: 'self-enhancing',
    name: 'Self-Enhancing',
    description: 'Using humor to cope with stress or stay positive',
    color: 'bg-blue-500'
  },
  {
    id: 'aggressive',
    name: 'Aggressive',
    description: 'Sarcasm, teasing, or put-down humor aimed at others',
    color: 'bg-red-500'
  },
  {
    id: 'self-defeating',
    name: 'Self-Defeating',
    description: 'Putting yourself down to amuse others',
    color: 'bg-orange-500'
  }
]

export const questionHumorMapping: Record<number, string[]> = {
  1: ['affiliative'], // "I usually don't laugh or joke around much with other people." (reverse scored)
  2: ['self-enhancing'], // "If I am feeling depressed, I can usually cheer myself up with humor."
  3: ['aggressive'], // "If someone makes a mistake, I will often tease them about it."
  4: ['self-defeating'], // "I let people laugh at me or make fun at my expense more than I should."
  5: ['affiliative'], // "I don't have to work very hard at making other people laugh — I seem to be a naturally humorous person."
  6: ['self-enhancing'], // "Even when I'm by myself, I'm often amused by the absurdities of life."
  7: ['aggressive'], // "People are never offended or hurt by my sense of humor." (reverse scored for aggressive)
  8: ['self-defeating'], // "I will often get carried away in putting myself down if it makes my family or friends laugh."
  9: ['affiliative'], // "I rarely make other people laugh by telling funny stories about myself." (reverse scored)
  10: ['self-enhancing'], // "If I am feeling upset or unhappy I usually try to think of something funny about the situation to make myself feel better."
  11: ['aggressive'], // "When telling jokes or saying funny things, I am usually not very concerned about how other people are taking it."
  12: ['self-defeating'], // "I often try to make people like or accept me more by saying something funny about my own weaknesses, blunders, or faults."
  13: ['affiliative'], // "I laugh and joke a lot with my friends."
  14: ['self-enhancing'], // "My humorous outlook on life keeps me from getting overly upset or depressed about things."
  15: ['aggressive'], // "I do not like it when people use humor as a way of criticizing or putting someone down." (reverse scored)
  16: ['self-defeating'], // "I don't often say funny things to put myself down." (reverse scored)
  17: ['affiliative'], // "I usually don't like to tell jokes or amuse people." (reverse scored)
  18: ['self-enhancing'], // "If I'm by myself and I'm feeling unhappy, I make an effort to think of something funny to cheer myself up."
  19: ['aggressive'], // "Sometimes I think of something that is so funny that I can't stop myself from saying it, even if it is not appropriate for the situation."
  20: ['self-defeating'], // "I often go overboard in putting myself down when I am making jokes or trying to be funny."
  21: ['affiliative'], // "I enjoy making people laugh."
  22: ['self-enhancing'], // "If I am feeling sad or upset, I usually lose my sense of humor." (reverse scored)
  23: ['aggressive'], // "I never participate in laughing at others even if all my friends are doing it." (reverse scored)
  24: ['self-defeating'], // "When I am with friends or family, I often seem to be the one that other people make fun of or joke about."
  25: ['affiliative'], // "I don't often joke around with my friends." (reverse scored)
  26: ['self-enhancing'], // "It is my experience that thinking about some amusing aspect of a situation is often a very effective way of coping with problems."
  27: ['aggressive'], // "If I don't like someone, I often use humor or teasing to put them down."
  28: ['self-defeating'], // "If I am having problems or feeling unhappy, I often cover it up by joking around, so that even my closest friends don't know how I really feel."
  29: ['affiliative'], // "I usually can't think of witty things to say when I'm with other people." (reverse scored)
  30: ['self-enhancing'], // "I don't need to be with other people to feel amused — I can usually find things to laugh about even when I'm by myself."
  31: ['aggressive'], // "Even if something is really funny to me, I will not laugh or joke about it if someone will be offended." (reverse scored)
  32: ['self-defeating'], // "Letting others laugh at me is my way of keeping my friends and family in good spirits."
}

export const reverseScored: number[] = [1, 7, 9, 15, 16, 17, 22, 23, 25, 29, 31]

export function calculateHumorStyleScores(responses: Record<number, number>): Record<string, number> {
  const styleScores: Record<string, { total: number; count: number }> = {}
  
  // Initialize style scores
  humorStyles.forEach(style => {
    styleScores[style.id] = { total: 0, count: 0 }
  })

  // Calculate scores for each question
  Object.entries(responses).forEach(([questionId, response]) => {
    const qId = parseInt(questionId)
    const styles = questionHumorMapping[qId]
    
    if (styles && response) {
      let score = response
      // Apply reverse scoring if needed
      if (reverseScored.includes(qId)) {
        score = 8 - response // Reverse 1-7 scale
      }
      
      styles.forEach(styleId => {
        if (styleScores[styleId]) {
          styleScores[styleId].total += score
          styleScores[styleId].count += 1
        }
      })
    }
  })

  // Calculate average scores
  const averageScores: Record<string, number> = {}
  Object.entries(styleScores).forEach(([styleId, { total, count }]) => {
    averageScores[styleId] = count > 0 ? total / count : 0
  })

  return averageScores
}