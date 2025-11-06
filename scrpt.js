let daftarMenu = [];

const menuAwal = [
    {
        id: Date.now(),
        nama: "Tteokbokki",
        harga: 35000,
        deskripsi: "Rice cake dengan saus gochugaru pedas manis",
        foto: "https://i.ibb.co.com/h1ZGc4kQ/tteokbokki-1.webp"
    },
    {
        id: Date.now() + 1,
        nama: "Ramen",
        harga: 45000,
        deskripsi: "Mie kuah dengan kaldu kental dan topping lengkap",
        foto: "https://san-j.com/wp-content/uploads/2023/01/Shoyu-Ramen-crop2.jpg"
    },
    {
        id: Date.now() + 2,
        nama: "Dimsum",
        harga: 28000,
        deskripsi: "Aneka dimsum kukus isi ayam dan udang",
        foto: "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/02/03/365073295.jpg"
    }
];
daftarMenu = [...menuAwal];


const formMenu = document.getElementById('formMenu');
const inputNama = document.getElementById('nama');
const inputHarga = document.getElementById('harga');
const inputDeskripsi = document.getElementById('deskripsi');
const inputFoto = document.getElementById('foto');

formMenu.addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = inputNama.value.trim();
    const harga = parseInt(inputHarga.value);
    const deskripsi = inputDeskripsi.value.trim();
    const foto = inputFoto.value.trim() || 'https://via.placeholder.com/150';

    if (nama === '' || isNaN(harga) || deskripsi === '') {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Membuat objek makanan
    const makanan = {
        id: Date.now(),
        nama,
        harga,
        deskripsi,
        foto
    };

    //tambahkan ke array
    daftarMenu.push(makanan);

    //reset form
    formMenu.reset();
    renderMenu();
});

const menuList = document.getElementById('menuList');

function renderMenu() {
    menuList.innerHTML = ''; // kosongkan dahulu

    daftarMenu.forEach(makanan => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow overflow-hidden flex flex-col';

    card.innerHTML = `
        <img src="${makanan.foto}" alt="${makanan.nama}" class="h-40
w-full object-cover">
        <div class="p-3 flex-1">
            <h3 class="font-semibold text-lg">${makanan.nama}</h3>
            <p class="text-sm text-gray-500">${makanan.deskripsi ||
'-'}</p>
            <p class="font-bold text-pink-800 mt-2">Rp
${makanan.harga.toLocaleString()}</p>
        </div>
        <button class="bg-pink-500 text-white py-2
hover:bg-pink-700">Tambah ke Pesanan</button>
`;

const btn = card.querySelector('button');
btn.addEventListener('click', () => tambahPesanan(makanan));

// nanti kita tambahkan event listener pada tombolnya
menuList.appendChild(card);
});
}

let daftarPesanan = [];
const orderList = document.getElementById('orderList');
const totalHarga = document.getElementById('totalHarga');

function tambahPesanan(makanan) {
    // cek apakah sudah ada di daftarPesanan (berdasarkan id)
    const found = daftarPesanan.find(item => item.id === makanan.id);
    if (found) {
        found.jumlah += 1;
    } else {
        // kita buat salinan object dan tambahkan properti jumlah
        daftarPesanan.push({ ...makanan, jumlah: 1 });
    }
    renderPesanan();
}


function renderPesanan() {
    orderList.innerHTML = '';
    let total = 0;

    daftarPesanan.forEach(item => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center py-2';

    li.innerHTML = `
        <div>
            <p class="font-semibold">${item.nama}</p>
            <p class="text-sm text-gray-500">Rp ${item.harga.toLocaleString()} ×
            ${item.jumlah}</p>
        </div>
        <div class="flex gap-2">
            <button class="bg-pink-500 text-white px-2 rounded decrease">-</button>
            <button class="bg-pink-500 text-white px-2 rounded increase">+</button>
            <button class="bg-red-500 text-white px-2 rounded delete">Hapus</button>
        </div>
        `;
// tombol hapus
        li.querySelector('.delete').addEventListener('click', () =>
hapusPesanan(item.id));
// tombol tambah/kurang jumlah
        li.querySelector('.increase').addEventListener('click', () =>
ubahJumlah(item.id, 1));
        li.querySelector('.decrease').addEventListener('click', () =>
ubahJumlah(item.id, -1));
        total += item.harga * item.jumlah;
        orderList.appendChild(li);
    });

    totalHarga.textContent = `Total: Rp ${total.toLocaleString()}`;
}

function hapusPesanan(id) {
    daftarPesanan = daftarPesanan.filter(item => item.id !== id);
    renderPesanan();
}
function ubahJumlah(id, delta) {
    const item = daftarPesanan.find(i => i.id === id);
    if (!item) return;

    item.jumlah += delta;
    if (item.jumlah <= 0) {
// jika jumlah 0 atau kurang, hapus item
        hapusPesanan(id);
    }  else {
        renderPesanan();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
});