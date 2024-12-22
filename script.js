// Hàm tạo bộ số ngẫu nhiên
function generateNumberSets() {
  const numberSets = [];
  for (let i = 0; i < 9; i++) {
    const set = [];
    for (let j = 0; j < 3; j++) {
      const number = Math.floor(Math.random() * 100);
      set.push(number);
    }
    numberSets.push(set);
  }
  return numberSets;
}

// Hàm tìm số trùng lặp
function findDuplicates(numberSets) {
  const allNumbers = numberSets.flat();
  const count = {};

  allNumbers.forEach((num) => {
    count[num] = (count[num] || 0) + 1;
  });

  const duplicates = {};
  for (let num in count) {
    if (count[num] > 1) {
      duplicates[num] = count[num];
    }
  }
  return duplicates;
}

// Hàm lấy 2 cặp số ngẫu nhiên
function getRandomPairs(duplicates) {
  const duplicateNumbers = Object.keys(duplicates);

  if (duplicateNumbers.length < 2) return null;

  const randomPairs = [];
  while (randomPairs.length < 2) {
    const randomIndexes = [];
    while (randomIndexes.length < 2) {
      const randomIndex = Math.floor(Math.random() * duplicateNumbers.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    randomPairs.push([
      duplicateNumbers[randomIndexes[0]],
      duplicateNumbers[randomIndexes[1]],
    ]);
  }

  return randomPairs;
}

// Hàm cập nhật UI
function updateUI(numberSets, duplicates, randomPairs) {
  // Hiển thị bộ số ngẫu nhiên
  const numberSetsList = document.getElementById("numberSetsList");
  numberSetsList.innerHTML = "";
  numberSets.forEach((set) => {
    const listItem = document.createElement("li");
    listItem.textContent = set
      .map((num) => num.toString().padStart(2, "0"))
      .join(", ");
    numberSetsList.appendChild(listItem);
  });

  // Hiển thị số trùng lặp
  const duplicatesList = document.getElementById("duplicatesList");
  duplicatesList.innerHTML = "";
  for (let num in duplicates) {
    const listItem = document.createElement("li");
    listItem.textContent = `Số ${num.padStart(2, "0")} xuất hiện ${
      duplicates[num]
    } lần`;
    duplicatesList.appendChild(listItem);
  }

  // Hiển thị 2 cặp số ngẫu nhiên
  const randomPairsList = document.getElementById("randomPairsList");
  randomPairsList.innerHTML = "";
  if (randomPairs) {
    randomPairs.forEach((pair) => {
      const listItem = document.createElement("li");
      listItem.textContent = `(${pair[0].padStart(2, "0")}, ${pair[1].padStart(
        2,
        "0"
      )})`;
      randomPairsList.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement("li");
    listItem.textContent = "Không đủ số trùng lặp để tạo cặp.";
    randomPairsList.appendChild(listItem);
  }
}

// Xử lý sự kiện khi nhấn nút
document
  .getElementById("generateButton")
  .addEventListener("click", function () {
    const numberSets = generateNumberSets();
    const duplicates = findDuplicates(numberSets);
    const randomPairs = getRandomPairs(duplicates);
    updateUI(numberSets, duplicates, randomPairs);
  });
