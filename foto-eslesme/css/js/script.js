let puanText = document.getElementById('puanText');
puan = 0;

puanText.innerHTML = "0"
const kartTemplate = `
    <div class="kart-cerceve">
        <div class="kart-onyuz">
            <img src="https://via.placeholder.com/100x100?text=?">
        </div>

        <div class="kart-arkayuz">
            <img src="">
        </div>
    </div>
`;
 let randomSon = []
    let randomArray = [];
let randomNum = function(){
  
    for (let i = 0; i < 8; i++){
       let randomNumbers = Math.floor(Math.random() * 99);
            randomArray.push( randomNumbers , randomNumbers);
     
        if (randomArray.length > 7) break;
    }  
    let sayi = randomSon.length
    for(i=0; i<8; i++){

  randomIndex= Math.floor(Math.random()* randomArray.length)
    const randomEleman =randomArray[randomIndex]
    randomSon.push(randomArray[randomIndex])
     randomArray.splice(randomIndex , 1)
}

    return randomArray
     
};
randomNum()
console.log(randomArray)
 console.log(randomSon)
/*
Görev 2: Bu numaraları 1-99 arası(1 ve 99 dahil) sayılardan rastgele 4 çift oluşturacak şekilde üreten bir fonksiyon yazarak, kod bloğundaki array değerini bu fonksiyondan dönen array ile değiştiren kodları yazın
*/
const fotoNumaralari = [10, 20, 30, 20, 10, 40, 40, 30, 88, 23, 99 , 33 ,88 , 33 ,99 ,23];



for (fotoNumara of randomSon) {
    const yenikart = document.createElement("div");
    yenikart.innerHTML = kartTemplate;
    yenikart.classList.add("kart");
    yenikart.querySelector(".kart-arkayuz img").src = `https://lipsum.app/id/${fotoNumara}/100x100`;
    document.querySelector("div#oyun-cerceve").append(yenikart);

    //Her bir karta tıklandığında "kartTiklama" fonksiyonu çalışacak.
    yenikart.addEventListener("click", kartTiklama);
}

function kartTiklama(olay) {
    //Tıklanan kartı seçilen olarak değişkene atayalım
    const secilenKart = olay.currentTarget;

    //Tıklanan kart eslesti classına sahipse daha önce başka kartla eşleşmiş ve zaten açık durumda demektir, işlem yapmayacağız.
    if (secilenKart.classList.contains("eslesti") === true) {
        return;
    }

    //Tıklanan ve açılan karta tekrar tıklanırsa işlem yapmayacağız.
    if (secilenKart.classList.contains("acik") === true) {
        return;
    }

    //Peşpeşe kartlara tıklandığında 2'den fazla kart tıklanmasını engellememiz gerekiyor.
    const tumAcikKartlar = document.querySelectorAll(".acik");
    if (tumAcikKartlar.length === 2) {
        return;
    }

    //Açık olan kart varsa seçelim.
    const acikKart = document.querySelector(".acik");

    //Hiç açık kart yoksa tıklanan karta açık class veriyoruz ve fonksiyondan çıkıyoruz.
    if (acikKart === null) {
        secilenKart.classList.add("acik");

        setTimeout(
            () => {
                secilenKart.classList.remove("acik");
            }, 1500
        );
        return;
    }

    //Daha önce bir açık kartımız varmış, son seçilen karta da açık class vererek tersini çevirelim.
    secilenKart.classList.add("acik");

    //Açık kartlara ait img etiketlerinin src görsel dosyaları eşleşiyor mu?
    const acikKartImg = acikKart.querySelector(".kart-arkayuz img");
    const secilenKartImg = secilenKart.querySelector(".kart-arkayuz img");

    if (acikKartImg.src === secilenKartImg.src) {
      //İki açık kart arasında eşleşme var.
      acikKart.classList.add("eslesti");
      secilenKart.classList.add("eslesti");

      puan++;

      console.log(puan);

      puanText.innerHTML = puan;


      function openModal (){
        let modal = document.getElementById("myModal")
        modal.style.display = "block";
      }

      function closeModal (){

        let modal = document.getElementById("myModal")
        modal.style.display="none"
      }
      if (puan === 4)
        {
          openModal();
            setTimeout(closeModal, 5000);
        }
         /*tam ekran modal oluşturdum ve puan 4 olduğunda opanmodal fonksiyonunu çağırıyor stilden default none olan dislayi block a çeviriyor 
         daha sonra settimeout 5 saniye sonra close modal fonksiyonunu çağırıyor o da tekrar displayi none a çeviriyor 
      /*
            Görev 1: Kullanıcı 4 kartı da eşleştirdiğinde sayfa ortasında beliren hareketli gif dosyası formatında bir kutlama görseli belirsin ve bu fotoğraf 5 saniye sonra ortadan kaybolsun.
        */


      acikKart.classList.remove("acik");
      secilenKart.classList.remove("acik");

      setTimeout(() => {
        acikKart.removeEventListener("click", kartTiklama);
        secilenKart.removeEventListener("click", kartTiklama);
      }, 1000);
    } else {
        //İki açık kartın görsel dosya adı birbirinden farklı, eşleşme yok, kartlar kapansın.
        setTimeout(() => {
            acikKart.classList.remove("acik");
            secilenKart.classList.remove("acik");
        }, 1500);
    }
}
