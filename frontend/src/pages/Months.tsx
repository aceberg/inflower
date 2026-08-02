import Compare from "../components/Months/Compare";
import PieCard from "../components/Months/PieCard";

function Months() {

  return (
    <div class="row mb-4">
      <div class="col-md mt-4">
        <Compare></Compare>
      </div>
      <div class="col-md mt-4">
        <PieCard></PieCard>
      </div>
    </div>
  )
}

export default Months