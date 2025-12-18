export default function getUrgency(text = "") {
  const urgentWords = [
    "loan",
    "approval",
    "disbursement",
    "urgent",
    "delay",
    "money"
  ];

  let score = 0;

  for (const word of urgentWords) {
    if (text.toLowerCase().includes(word)) {
      score += 2;
    }
  }

  return score;
}
