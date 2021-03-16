function save() {

  const date = document.getElementById("checkIn").value;
  const noOfTikets = document.getElementById("noftik").value;
  const travelclass = document.getElementById("travelclass").value;
  sessionStorage.setItem("Tdate", date);
  sessionStorage.setItem("noOfTikets", noOfTikets);
  sessionStorage.setItem("Tclass", travelclass);
//   console.log(id);
};