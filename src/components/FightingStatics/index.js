export default function FightingStatics() {
  const heroAttack = 1 + Math.floor(Math.random() * 100);
  const opponentAttack = 1 + Math.floor(Math.random() * 100);

  const functionForFight = () => {
    if (heroAttack >= opponentAttack) {
      return alert("Hero win!!");
    } else {
      return alert("Hero lost!!");
    }
  };

  return (
    <div>
      {" "}
      <button onClick={() => functionForFight()} className="button-24">
        Fight
      </button>
    </div>
  );
}
