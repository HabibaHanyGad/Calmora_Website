//bootstrap خاص بال 
window.onload = function () {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

//payment model
let selectedDoctor = "";
let selectedMethod = "";
let selectedPrice = 0;

function bookSession(doctorName, price) {
    selectedDoctor = doctorName;
    selectedPrice = price;
    document.getElementById("payment-modal").classList.remove("hiddenn");
    document.getElementById("amount").value = selectedPrice;

    // إخفاء التأكيد لو كان ظاهر من حجز سابق
    document.getElementById("confirmation").classList.add("hiddenn");
}

function closePayment() {
    document.getElementById("payment-modal").classList.add("hiddenn");
    document.getElementById("payment-form").classList.add("hiddenn");
    document.getElementById("confirmation").classList.add("hiddenn");
    document.getElementById("userName").value = "";
    document.getElementById("userPhone").value = "";
    document.getElementById("cardNumber").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("cardPassword").value = "";
    selectedDoctor = "";
    selectedMethod = "";
    selectedPrice = 0;
}

function selectPayment(method) {
    selectedMethod = method;
    document.getElementById("payment-form").classList.remove("hiddenn");
}

function confirmBooking() {
    const name = document.getElementById("userName").value;
    const phone = document.getElementById("userPhone").value;
    const card = document.getElementById("cardNumber").value;
    const amount = document.getElementById("amount").value;
    const password = document.getElementById("cardPassword").value;
    const transactionId = "TXN" + Math.floor(Math.random() * 1000000);

    if (!name || !phone || !card || !amount || !password) {
        alert("من فضلك اكمل كل البيانات.");
        return false;
    }

    document.getElementById("payment-form").classList.add("hiddenn");

    const confirmationText = `
        Doctor: ${selectedDoctor} <br>
        Name: ${name} <br>
        Phone Number : ${phone} <br>
        Payment Method : ${selectedMethod} <br>
        Card Number: ${card} <br>
        Amount: ${amount} EGP <br>
        ID: ${transactionId} <br><br>
        We will call you soon.
        `;
    document.getElementById("confirmation-details").innerHTML = confirmationText;
    document.getElementById("confirmation").classList.remove("hiddenn");

    // تفريغ الحقول بعد التأكيد
    document.getElementById("userName").value = "";
    document.getElementById("userPhone").value = "";
    document.getElementById("cardNumber").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("cardPassword").value = "";
    selectedDoctor = "";
    selectedMethod = "";
    selectedPrice = 0;

    return false; // منع إعادة تحميل الصفحة
}



//scrolle زر ال
const scrollBtn = document.getElementById("scrollTopBtn");

// إظهار الزر بعد النزول 200px
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

// لما يضغط على الزر يرجع لأعلى الصفحة
scrollBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

//الصوت اول لما افتح الصفحه وبيكون مره واحده ولو عملت reloade مش بيحمل تانى 
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("welcomeAudio");
  if (!sessionStorage.getItem("welcomePlayed")) {
    const tryPlay = () => {
      audio.play().then(() => {
        sessionStorage.setItem("welcomePlayed", "true");
      }).catch((err) => {
        console.warn("Autoplay blocked. Waiting for user interaction.");
        // لو المتصفح منع التشغيل التلقائي، شغّله بعد أول تفاعل
        document.addEventListener("click", playOnce);
      });
    };

    const playOnce = () => {
      audio.play();
      sessionStorage.setItem("welcomePlayed", "true");
      document.removeEventListener("click", playOnce);
    };

    tryPlay();
  }
});