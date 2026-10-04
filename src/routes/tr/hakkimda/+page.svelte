<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="Hakkımda"
	description="Halil İbrahim Öztürk: İzmir Yüksek Teknoloji Enstitüsü’nde bilgisayar mühendisliği öğrencisi, Haziran 2027’de mezun oluyor."
/>

<div class="container page">
	<p class="eyebrow">Hakkımda</p>
	<h1>Halil İbrahim Öztürk</h1>

	<div class="prose">
		<p class="lede">
			İzmir Yüksek Teknoloji Enstitüsü’nde dördüncü sınıf bilgisayar mühendisliği öğrencisiyim, Haziran
			2027’de mezun oluyorum. Hâlâ üniversitede okuyorum ama iş hayatına atılmak için sabırsızlanıyorum;
			gerçek projelerle uğraşmak, gerçek mühendislik problemlerini çözmek beni mutlu ediyor.
		</p>

		<h2>Nasıl başladım</h2>
		<p>
			Lise 1’deyken, 2019’da kod yazmaya başladım. Asıl başlama sebebim, pandemide evde kaldığım sürede
			yapacak bir şey olması ve kodlamanın verdiği zevki başka hiçbir şeyin vermemesiydi. O zamanlar Unity
			ile oyun yapmayı öğrenmeye başladım. Bundan önce Deneyap’ta biraz blok tabanlı robotik kodu
			yazmıştık ama çok da bilgili değildim.
		</p>
		<p>
			Sonra Unity’de her şeyin bir şekilde sihir gibi çalışması canımı sıktı ve işin detayını öğrenmek
			istedim. MIT’nin introduction to programming dersini YouTube’dan izleyip Python ve C’de kendi
			kodlarımı yazmaya çalışıyordum. Aynı zamanda p5.js ile oyun ve animasyon yapan bir YouTube kanalı
			keşfettim; orada Unity’den çok daha alt seviyede, pixellerin pozisyonlarıyla oynayabiliyorduk. Çok
			vakit geçirdim orada: önce snake, sonra tower defense gibi oyunları p5.js’te yazdım.
		</p>
		<p>
			Bunlar ilerledikçe YouTube’da C++ öğreten Cherno ile tanıştım ve kendimi bilgisayar mühendisliğinde
			buldum. Yani temelim ortaokulun sonu, lisenin başı gibi atıldı ve bu yolda gördüğüm her içerik, her
			problem beni bu alana biraz daha çekti.
		</p>

		<h2>Ne arıyorum</h2>
		<p>
			2027’den itibaren staj ve yeni mezun pozisyonlarına bakıyorum: systems, embedded, oyun ya da backend
			tarafı olabilir. En rahat olduğum diller C++ ve Python; gerektiğinde web tarafında da çalışırım.
			Şehir değiştirmeye de açığım.
		</p>
		<p class="note">
			Proje sayfaları şimdilik sadece İngilizce:
			<a href="/projects/wolf">Wolf</a>, <a href="/projects/scheduler">CPU Scheduler</a>,
			<a href="/projects/kings">Kings</a>, <a href="/projects/borsa">Borsa</a>,
			<a href="/projects/topluluk">Topluluk</a>.
		</p>

		<h2>Deneyim</h2>
		<ul>
			<li>
				<strong>ASELSAN</strong>, Gömülü Sistemler Stajyeri, Ağustos – Eylül 2026. C++20 ile trace tabanlı
				bir CPU scheduler simülatörü ve AI agent’lar için AGENTS.md üreten bir araç. Türkiye’nin en büyük
				şirketlerinden birinde ilk kez çalıştım; çok fazla çalışanı olan bir yer.
			</li>
			<li>
				<strong>TechNarts</strong>, Yazılım Mühendisliği Stajyeri, Haziran – Eylül 2025.
				<a href="/projects/topluluk">Topluluk</a> platformunu tek başıma geliştirdim. Büyümekte olan,
				startup havasında bir yerdi; çalışma saatlerinin esnekliği çok iyiydi ve ortam büyük şirketlere göre
				çok daha rahattı.
			</li>
			<li>
				<strong>Cengaver Rover Takımı, İYTE</strong>, Elektronik Ekibi Üyesi, Ekim 2024 – Haziran 2025.
				Rover’ın motor sürücüleri için CAN üzerinden haberleşen STM32 kodu. Takım arkadaşlarım gerçekten bir
				şeyler üretmek ve yarışmalarda iyi dereceler almak isteyen insanlardı; onlarla tanışmak network’üm
				için de iyi oldu.
			</li>
			<li>
				<strong>Google Developer Student Clubs, İYTE</strong>, Technical Core Member, Ekim 2023 – Haziran
				2024. 100’den fazla öğrencinin katıldığı teknik workshop’ların ve konuşmacı etkinliklerinin
				düzenlenmesine yardım ettim. Bir toplulukta ilk kez görev alıyordum; yeni insanlarla tanışmak, yeni
				başladığım üniversiteye alışmamı kolaylaştırdı.
			</li>
		</ul>

		<h2>Eğitim</h2>
		<ul>
			<li>
				<strong>İzmir Yüksek Teknoloji Enstitüsü</strong>, Bilgisayar Mühendisliği (lisans), Haziran 2027’de
				mezun olacak. GPA 3,73 / 4,00.
			</li>
			<li><strong>Ankara Pursaklar Fen Lisesi</strong>, 2023 mezunu.</li>
			<li><strong>Deneyap</strong>, T3 Vakfı, 2020 mezunu.</li>
		</ul>

		<h2>Bilgisayar dışında</h2>
		<p>
			Bilgisayar başında değilsem büyük ihtimalle basketbol, satranç ya da masa tenisi oynuyorumdur.
			Bir de fırsat buldukça mangal.
		</p>

		<h2>Diller</h2>
		<p>Türkçe (ana dil), İngilizce (B2).</p>
	</div>
</div>

<style>
	.page {
		padding-top: clamp(40px, 8vw, 88px);
	}

	h1 {
		margin: 10px 0 28px;
		font-size: clamp(2.4rem, 6vw, 3.6rem);
	}

	.lede {
		font-size: 1.25rem;
		line-height: 1.55;
	}

	.note {
		color: var(--muted);
		font-size: 0.9375rem;
	}
</style>
