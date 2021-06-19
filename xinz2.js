/*
BY AQULZZ
*/
const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
} = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
const fs = require("fs");
const imgbb = require('imgbb-uploader')
const { exec } = require('child_process');
const aqul = require('./whatsapp/message.js');
const speed = require('performance-now');
const ffmpeg = require('fluent-ffmpeg');
const conn = require('./whatsapp/connect');
const { color } = require('./lib/color');
const mess = JSON.parse(fs.readFileSync('./whatsapp/mess.json'));
const axios = require('axios');
const fetch = require('node-fetch');
const Exif = require('./lib/exif');
const { uptotele, uptonaufal, uploadFile } = require('./lib/uploadimage')
const exif = new Exif();

conn.connect()
const xinz = conn.xinz

fake = "© C.A STORE"
fakeimage = fs.readFileSync("./media/aqul.jpeg")
prefix = '#'
blocked = []
cprefix = ''
baterai = {
    baterai: 0,
    cas: false
}

xinz.on('CB:Blocklist', json => {
	if (blocked.length > 2) return
	for (let i of json[1].blocklist) {
		blocked.push(i.replace('c.us','s.whatsapp.net'))
	}
})
xinz.on('CB:action,,battery', json => {
	const a = json[2][0][1].value
	const b = json[2][0][1].live
	baterai.baterai = a
	baterai.cas = b
})
xinz.on('message-update', async (msg) => { // THX TO BANG HANIF
	require('./antidelete/antidelete.js')(xinz, msg)
})
xinz.on('message-new', async(qul) => {
    try {
        if (!qul.message) return
		if (qul.key && qul.key.remoteJid == 'status@broadcast') return
        qul.message = (Object.keys(qul.message)[0] === 'ephemeralMessage') ? qul.message.ephemeralMessage.message : qul.message
		let infoMSG = JSON.parse(fs.readFileSync(`./antidelete/msg.data.json`))
		infoMSG.push(JSON.parse(JSON.stringify(qul)))
		fs.writeFileSync(`./antidelete/msg.data.json`, JSON.stringify(infoMSG, null, 2))
		const urutan_pesan = infoMSG.length
		if (urutan_pesan === 5000) {
			infoMSG.splice(0, 4300)
			fs.writeFileSync(`./antidelete/msg.data.json`, JSON.stringify(infoMSG, null, 2))
		}
        global.prefix
        global.cprefix
		const content = JSON.stringify(qul.message)
		const from = qul.key.remoteJid
		const type = Object.keys(qul.message)[0]
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
		body = (type === 'conversation' && qul.message.conversation.startsWith(prefix)) ? qul.message.conversation : (type == 'imageMessage') && qul.message.imageMessage.caption.startsWith(prefix) ? qul.message.imageMessage.caption : (type == 'videoMessage') && qul.message.videoMessage.caption.startsWith(prefix) ? qul.message.videoMessage.caption : (type == 'extendedTextMessage') && qul.message.extendedTextMessage.text.startsWith(prefix) ? qul.message.extendedTextMessage.text : ''
		chats = (type === 'conversation') ? qul.message.conversation : (type === 'extendedTextMessage') ? qul.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
		const comand = body.slice(0).trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		bodi = (type === 'conversation' && qul.message.conversation.startsWith(cprefix)) ? qul.message.conversation : (type == 'imageMessage') && qul.message.imageMessage.caption.startsWith(cprefix) ? qul.message.imageMessage.caption : (type == 'videoMessage') && qul.message.videoMessage.caption.startsWith(cprefix) ? qul.message.videoMessage.caption : (type == 'extendedTextMessage') && qul.message.extendedTextMessage.text.startsWith(cprefix) ? qul.message.extendedTextMessage.text : ''
		//const tai = bodi.slice(0).trim().split(/ +/).shift().toLowerCase()
		//const argus = body.trim().split(/ +/).slice(1)
		const isCpref = chats.toLowerCase()
		const q = args.join(" ")
		const arg = chats.slice(command.length + 2, chats.length)
		const arguz = chats.slice(comand.length + 0, chats.length)

        const botNumber = xinz.user.jid
		const isGroup = from.endsWith('@g.us')
		const sender = qul.key.fromMe ? xinz.user.jid : isGroup ? qul.participant : qul.key.remoteJid
		const totalchat = await xinz.chats.all()
		const groupMetadata = isGroup ? await xinz.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupAdmins = isGroup ? aqul.getGroupAdmins(groupMembers) : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const itsMe = qul.key.fromMe ? true : false
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
		}

        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
		const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
		// Auto Reply Group by RidhoSenpai
		if (isGroup){
			if (chats.toLowerCase() === 'p'){
            aqul.reply(from, `Bisa salam ga sih ajg?\nuntuk Memulai bot\nSilahkan ketik ${prefix}help`, qul)
        }
    }
    	if (isGroup){
    		if (chats.toLowerCase() === 'bot') {
            aqul.reply(from, `Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}help`, qul)
        }
	}
        if (isGroup){
        	if (chats.toLowerCase() === 'assalamualaikum') {
            aqul.sendFakeStatus(from, `Waalaikumsalam...\nHalo Kak, Untuk Memulai bot silahkan ketik ${prefix}help`, fake)
        }
    }
    	if (isGroup){
        	if (chats.toLowerCase() === `assalamu'alaikum`) {
            aqul.sendFakeStatus(from, `Waalaikumsalam...\nHalo Kak, Untuk Memulai bot silahkan ketik ${prefix}help`, fake)
        }
    }
    	if (isGroup){
    		hadeh = (type === 'conversation') ? qul.message.conversation : (type === 'extendedTextMessage') ? qul.message.extendedTextMessage.text : ''
    		p = hadeh.toLowerCase()
    		switch (comand) {
    			case 'beli':
    		if (!isCpref) aqul.reply(from, `Penggunaan: beli Nickname|ID|OrderDM|SisaDM`, qul)
    		if (!p)
    		argi = arguz.split('|')
				if (args.length < 1) return aqul.reply(from, `Penggunaan ${prefix}beli nickname|ID|OrderDM|SisaDM`, qul)
				if (!argi) return aqul.reply(from, `Penggunaan ${prefix}beli nickname|ID|OrderDM|SisaDM`, qul)
					aqul.sendFakeStatus(from, `
--------Format Pembayaran---------
*Nickname*: ${argi[0]}
*ID*: ${argi[1]}
*Order DM*: ${argi[2]}
*Sisa DM*: ${argi[3]}

\`\`\`WhatsApp \`\`\`: wa.me/${sender.split('@s.whatsapp.net')}
----------------------------------
`, fake)
				break
    	}
    }
    	/*if (isGroup){
    		if (chats.toLowerCase() === 'Apakah')
    	}*/

		/*if (itsMe){
			if (chats.toLowerCase() === `${prefix}self`){
				public = false
				aqul.sendFakeStatus(from, `Sukses`, `Status: SELF`)
			}
		}*/
        //Auto Reply by Lord Damuez
        /*if (isGroup){
		if (chats.toLowerCase() === 'p'){
            aqul.sendFakeStatus(from, `Bisa salam ga sih ajg?\nuntuk Memulai bot\nSilahkan ketik ${prefix}help`, fake)
        }
    }
        if (chats.toLowerCase() === 'bot') {
            if (isGroup) await aqul.sendFakeStatus(from, `Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}help`, fake)
        }
        
        if (chats.toLowerCase() === 'Bot') {
            if (isGroup) await aqul.sendFakeStatus(from, `Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}help`, fake)
        }
        
        if (chats.toLowerCase() === 'assalamualaikum') {
            if (isGroup) await aqul.sendFakeStatus(from, `Waalaikumsalam, Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}help`, fake)
        }
        
        if (chats.toLowerCase() === 'Assalamualaikum') {
            if (isGroup) await aqul.sendFakeStatus(from, `Waalaikumsalam, Halo Kak, Untuk Memulai bot silahkan ketik ${prefix}help`, fake)
        }*/
			if (chats.toLowerCase() === 'status'){
				aqul.sendFakeStatus(from, `STATUS: ${public ? 'PUBLIC' : 'SELF'}`)
			}/*
			if (chats.startsWith('>')){
				console.log(color('[EVAL]'), color(moment(qul.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Eval brooo`))
				return aqul.reply(from, JSON.stringify(eval(chats.slice(2)), null, 2), qul)
			}*/
		if (isGroup){
			if (!qul.key.fromMe) return
		}
	/*if (isCpref && !isGroup) {console.log(color('[Custom]'), color(moment(qul.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))}
        if (isCpref && isGroup) {console.log(color('[Custom]'), color(moment(qul.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(xinz.user.name), 'in', color(groupName))}
        switch (command) {
			case 'Apakah':
			case 'apakah':
				buriq = arg.endsWith('?')
			if (!buriq) return aqul.sendFakeStatus(from, `Penggunaan: apakah <pertanyaan>?`, fake)
			aqul.reply(from, `
*Pertanyaan:* ${buriq}
*Jawaban:* ${pickRandom(['Ya','Mungkin iya','Mungkin','Mungkin tidak','Tidak','Tidak mungkin','Mustahil!', '', 'Bisa jadi'])}
`, qul)
				break
			case 'help':
        		aqul.sendFakeStatus(from, `Hallo, Sekarang bot C.A STORE memiliki 2 menu\n
Untuk *Menu 1* Silahkan ketik ${cprefix}menu1. Menu pertama ini berisi List harga dan pembayaran\n
Untuk *Menu 2* Silahkan ketik ${cprefix}menu2. Menu yg kedua ini bersisi berbagai macam fitur.`, fake)
        		break
        	case 'menu1':
        		textnya = ` C.A Store BOT
\`\`\`▢ ${cprefix}ffid (List DM FF)\`\`\`
\`\`\`▢ ${cprefix}mlid (List DM ML)\`\`\`
\`\`\`▢ ${cprefix}payment (Nomor Pembayaran)\`\`\`
\`\`\`▢ ${cprefix}beli Nickname|ID|OrderDM|SisaDM\`\`\`

*C.A Store*`
aqul.sendFakeStatus(from, textnya, fake)
				break
			case 'menu2':
				textnya = `	C.A Store BOT

\`\`\`▢ info\`\`\`
\`\`\`▢ ${cprefix}sticker\`\`\`
\`\`\`▢ ${cprefix}trigger <reply gambar>\`\`\`
\`\`\`▢ ${cprefix}triggered <url gambar>\`\`\`
\`\`\`▢ ${cprefix}swm nama | author\`\`\`
\`\`\`▢ ${cprefix}takestick nama | author\`\`\`
\`\`\`▢ ${cprefix}colong <reply stiker>\`\`\`
\`\`\`▢ ${cprefix}eval <java scripts>\`\`\`
\`\`\`▢ ${cprefix}self\`\`\`
\`\`\`▢ ${cprefix}public\`\`\`
\`\`\`▢ ${cprefix}hidetag\`\`\`
\`\`\`▢ ${cprefix}runtime\`\`\`
\`\`\`▢ ${cprefix}speed\`\`\`
\`\`\`▢ ${cprefix}mystat\`\`\`
\`\`\`▢ ${cprefix}kontak\`\`\`
\`\`\`▢ ${cprefix}hidetag\`\`\`
\`\`\`▢ ${cprefix}term\`\`\`
\`\`\`▢ ${cprefix}setreply\`\`\`
\`\`\`▢ ${cprefix}setprefix\`\`\`
\`\`\`▢ ${cprefix}setname\`\`\`
\`\`\`▢ ${cprefix}setpp\`\`\`
\`\`\`▢ ${cprefix}setbio\`\`\`
\`\`\`▢ ${cprefix}fdeface\`\`\`
\`\`\`▢ ${cprefix}fakethumbnail\`\`\`
\`\`\`▢ ${cprefix}setthumb\`\`\`
\`\`\`▢ ${cprefix}getpic\`\`\`
\`\`\`▢ ${cprefix}stickertag\`\`\`
\`\`\`▢ ${cprefix}imgtag\`\`\`
\`\`\`▢ ${cprefix}kontaktag\`\`\`
\`\`\`▢ ${cprefix}doctag\`\`\`
\`\`\`▢ ${cprefix}giftag\`\`\`
\`\`\`▢ ${ccprefix}apakah <pertanyaan>?\`\`\`
\`\`\`▢ ${cprefix}tahta teks\`\`\`
\`\`\`▢ ${cprefix}pubg teks1|teks2\`\`\`
\`\`\`▢ ${cprefix}promote\`\`\`
\`\`\`▢ ${cprefix}demote\`\`\`
\`\`\`▢ ${cprefix}kick\`\`\`
\`\`\`▢ ${cprefix}add\`\`\`
\`\`\`▢ ${cprefix}creategrup nama|tag\`\`\`
\`\`\`▢ ${cprefix}getgrup\`\`\`
\`\`\`▢ ${cprefix}upstatus text\`\`\`
\`\`\`▢ ${cprefix}tovideo\`\`\`
\`\`\`▢ ${cprefix}togif\`\`\`
\`\`\`▢ ${cprefix}spam teks|jumlah spam\`\`\`
\`\`\`▢ ${cprefix}imgtourl\`\`\`
\`\`\`▢ ${cprefix}ephemeral <teks>\`\`\`
\`\`\`▢ ${cprefix}antidelete\`\`\`
\`\`\`▢ ${cprefix}tourl <media>\`\`\`

*C.A Store*`
				aqul.sendFakeStatusWithImg(from, fakeimage, textnya, fake)
				break
			case 'info':
			aqul.sendFakeStatusWithImg(from, fakeimage, `
\`\`\`Hanya Sekedar Info\`\`\`
*Hallo....*
Bagi Pembeli setia C.A Store
Pasti tau kan kalau di group C.A STORE memiliki bot...
nah bot C.A Store sekarang sudah bisa digunakan
bahkan tanpa prefix("${prefix}").

Oke Sekian infonya :v
Jika ingin menggunakan bot bisa langsung
\`\`\`Ketik:\`\`\` help
`, fake)
            case 'test':
                aqul.sendText(from, 'oke')
				break
			case 'public':
				public = true
				aqul.sendFakeStatus(from, `Status: PUBLIC`, fake)
				break
			case 'exif':
				if (!itsMe) return
				if (args.length < 1) return aqul.reply(from, `Penggunaan ${prefix}exif nama|author`, qul)
				if (!arg.split('|')) return aqul.reply(from, `Penggunaan ${prefix}exif nama|author`, qul)
				exif.create(arg.split('|')[0], arg.split('|')[1])
				aqul.reply(from, 'sukses', qul)
				break
			case 'ffid':
			case 'ff':
				aqul.sendFakeStatus(from, `
\`\`\`📌 VIA ID\`\`\`
--------------------------------------------------
\`\`\`• 5💎    : 900\`\`\`
\`\`\`• 20💎   : 2.900\`\`\`
\`\`\`• 50💎   : 6.940\`\`\`
\`\`\`• 70💎   : 9.440\`\`\`
\`\`\`• 100💎  : 13.540\`\`\`
\`\`\`• 140💎  : 18.680\`\`\`
\`\`\`• 150💎  : 20.320\`\`\`
\`\`\`• 210💎  : 28.000\`\`\`
\`\`\`• 355💎  : 46.800\`\`\`
\`\`\`• 500💎  : 65.820\`\`\`
\`\`\`• 720💎  : 93.000\`\`\`
\`\`\`• 1000💎 : 130.360\`\`\`
\`\`\`• 1075💎 : 139.600\`\`\`
\`\`\`• 1440💎 : 185.800\`\`\`
\`\`\`• 2000💎 : 253.000\`\`\`
--------------------------------------------------
\`\`\`MEMBERSHIP\`\`\`
\`\`\`MINGGUAN : 28.200\`\`\`
\`\`\`BULANAN : 112.200\`\`\`
`, fake)
				break
			case 'mlid':
			case 'mlbb':
			case 'ml':
				aqul.sendFakeStatus(from, `
\`\`\`MOBILE LEGENDS BANG BANG\`\`\`
---------------------------------------------------------
\`\`\`86    💎 Rp 18.850\`\`\`
\`\`\`172   💎 Rp 36.375\`\`\`
\`\`\`257   💎 Rp 55.480\`\`\`
\`\`\`344   💎 Rp 73.500\`\`\`
\`\`\`429   💎 Rp 92.610\`\`\`
\`\`\`514   💎 Rp 112.100\`\`\`
\`\`\`706   💎 Rp 148.000\`\`\`
\`\`\`963   💎 Rp 202.100\`\`\`
\`\`\`1412  💎 Rp 292.000\`\`\`
---------------------------------------------------------
\`\`\`KONFIRMASI TERLEBIH DAHULU SEBELUM TRANSFER\`\`\`
---------------------------------------------------------
`, fake)
				break
				case 'owner':
			ownernya = `
Hallo, Mau minta nomor owner yg mana?
untuk owner pertama Silahkan ketik ${prefix}owner1
untuk owner kedua Silahkan ketik ${prefix}owner2
`
				aqul.reply(from, ownernya, qul)
				break
			case 'owner1':
				aqul.sendKontak(from, `62895373597911`, `Coklat Store (Musfi)`)
				break
			case 'owner2':
				aqul.sendKontak(from, `6282111170610`, `LA (Ari)`)
				//aqul.sendKontak(from, '6282111170610', 'LA (Ari)')
				break
			case 'trigger':
			//////////////////////////////////////////////////////////////////
				if (!isQuotedImage) return aqul.sendFakeStatus(from, `Reply gambarnya om :v`, qul)
					const mati = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const kau = await xinz.downloadAndSaveMediaMessage(mati, `./image/${Math.floor(Math.random() * 10000)}`)
        			const anjeng = await imgbb("bbd84b1e8f381e888d1bb48a8846637e", kau)
        			const url = `${anjeng.display_url}`
        			let ranp = getRandom('.gif')
        			let rano = getRandom('.webp')
        			let ashu = `${ranp}`
        			let kontol = `${rano}`
        			meki = `http://ahmadxx.herokuapp.com/api/trigger?url=${url}`
        				exec(`wget ${meki} -O ${ashu} && ffmpeg -i ${ashu} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${kontol}`, (err) => {
            			fs.unlinkSync(ashu)
            			if (err) return console.error(err)
            			//nobg xinz= fs.readFileSync(kontol)
            			aqul.sendSticker(from, fs.readFileSync(kontol), qul)
            			fs.unlinkSync(kontol)
            			fs.unlinkSync(kau)
        			})
        		/* @Params (url) //
        		// if (!isQuotedImage) return aqul.sendFakeStatus(from, `Reply gambarnya om :v`, qul)
				//	const mati = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
				//	const kau = await xinz.downloadAndSaveMediaMessage(mati, `./image/${Math.floor(Math.random() * 10000)}`)
        		//	const anjeng = await imgbb("bbd84b1e8f381e888d1bb48a8846637e", kau)
        		//	const url = `${anjeng.display_url}`
        		//	let ranp = getRandom('.gif')
        		//	let rano = getRandom('.webp')
        		//	let ashu = `${ranp}`
        		//	let kontol = `${rano}`
        		//	meki = `http://ahmadxx.herokuapp.com/api/trigger?url=${url}`
        		//		exec(`wget ${meki} -O ${ashu} && ffmpeg -i ${ashu} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${kontol}`, (err) => {
            	//		fs.unlinkSync(ashu)
            	//		if (err) return console.error(err)
            	//		//nobg xinz= fs.readFileSync(kontol)
            	//		aqul.sendSticker(from, fs.readFileSync(kontol), qul)
            	//		fs.unlinkSync(kontol)
            	//		fs.unlinkSync(owgi)
        		//	})*
				break
			case 'triggered':
			//////////////////////////////////////////////////////////////////
				/*if (!asw) return aqul.sendFakeStatus(from, `Masukkan Link dengan benar`, qul)
					//const ansu = await imgbb("bbd84b1e8f381e888d1bb48a8846637e", owgi)
					const trg = await axios.get()
        			const url = `${anu.display_url}`
        			let ranp = getRandom('.gif')
        			let rano = getRandom('.webp')
        			let ashu = `${ranp}`
        			let kontol = `${rano}`
        			anu1 = `http://ahmadxx.herokuapp.com/api/trigger?url=${url}`
        				exec(`wget ${anu1} -O ${ashu} && ffmpeg -i ${ashu} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${kontol}`, (err) => {
            			fs.unlinkSync(ashu)
            			if (err) return console.error(err)
            			//nobg = fs.readFileSync(kontol)
            			aqul.sendSticker(from, fs.readFileSync(kontol), qul)
            			fs.unlinkSync(kontol)
            			fs.unlinkSync(owgi)
        			})*
        			//////////////
        		if (!itsMe) return
        		if (!arg) return aqul.reply(from, `Penggunaan ${prefix}triggered <url gambar>`, qul)
				if (!isUrl) return aqul.reply(from, mess.error.url, qul)
					aqul.sendFakeStatus(from, mess.wait, fake)
					axios.get(`http://ahmadxx.herokuapp.com/api/trigger?url=${arg[0]}`)
					.then((res) => {
						aqul.sendFakeStatus(from, `Nih`, fake)
						//aqul.sendMediaURL(from, res.data.result.url)
						aqul.sendSticker(from, res.data.result.url, qul)
					})
					.catch((err) => {
						console.log(err)
						aqul.reply(from, mess.error.api, qul)
					})
					.save(`./sticker/${getRandom}`)
        		break
				/////////////////////////////
				//belajar xnxx
			/*case 'xnxx':
			if (!asw) return aqul.sendFakeStatus(from, `Masukkan Linknya`)
				try {
                    aqul.sendFakeStatus(from, mess.wait, qul)
                    const webplay = await fetch(`https://api.lolhuman.xyz/api/xnxx?apikey=8308af29ac83b4257fb74e42&url=${bokep}`)
                    if (!webplay.ok) throw new Error(`Error Get Video : ${webplay.statusText}`)
                    const webplay2 = await webplay.json()
                	const bokep = `${arg}`
                    if (webplay2.status == false) {
                        aqul.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon masukkan link yg valid*`, id)
                    } else {	
                        const { title, mp4, rating, tag, duration } = await webplay2.result
                        const captplay = `*「 PLAY 」*\n\n➸ *Judul* : ${title}\n➸ *Durasi* : ${duration}\n➸ *Rating* : ${$rating}\n➸ *Tag* : ${tag}\n\n_*Saat ini Video belum dapat di kirim*_`
                        aqul.sendMediaURL(from, image, `thumbnail.jpg`, captplay, qul)
                        await aqul.sendMediaURL(from, mp3, `${title}.mp3`, '', qul).catch(() => aqul.reply(from, mess.error.api, qul))
                    }
                } catch (err) {
                    aqul.sendFakeStatus(from, 'Error Play : ' + err, qul)
                    aqul.reply(from, 'Yah error coba lain waktu :(', qul)
                }
                break/////
            case 'payment':
            case 'pay':
            case 'p':
            pembayaran = `
PAYMENT 💳:
\`\`\`GOPAY 1: 0895373597911 || Coklat Store\`\`\`
\`\`\`GOPAY 2: 082111170610  || Laksamana Arianda\`\`\`
\`\`\`DANA  1: 085727206718  || Masuroh\`\`\`
\`\`\`DANA  2: 082111170610  || Laksamana Arianda\`\`\`
\`\`\`OVO    : 082111170610  || Sumiyati\`\`\`

*Mohon Sertakan Bukti Tf Agar Cepat Di Proses*🙏
`
            aqul.sendFakeStatus(from, pembayaran, fake)
            	break
			case 'sticker':
			case 'stiker':
			case 's':
				if (isMedia && !qul.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								aqul.reply(from, mess.error.api, qul)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return aqul.reply(from, mess.error.api, qul)
									aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)
									fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else if ((isMedia && qul.message.videoMessage.fileLength < 10000000 || isQuotedVideo && qul.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					aqul.reply(from, mess.wait, qul)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								aqul.reply(from, mess.error.api, qul)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return aqul.reply(from, mess.error.api, qul)
									aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)
									fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else {
					aqul.reply(from, `Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`, qul)
				}
				break
			case 'swm':
			case 'stickerwm':
				if (isMedia && !qul.message.videoMessage || isQuotedImage) {
					if (!arg.includes('|')) return aqul.reply(from, `Kirim gambar atau reply gambar dengan caption *${prefix}stickerwm nama|author*`, qul)
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					const packname1 = arg.split('|')[0]
					const author1 = arg.split('|')[1]
					exif.create(packname1, author1, `stickwm_${sender}`)
					await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								aqul.reply(from, mess.error.api, qul)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return aqul.reply(from, mess.error.api, qul)
									aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)
									fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
									fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else if ((isMedia && qul.message.videoMessage.fileLength < 10000000 || isQuotedVideo && qul.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
					if (!arg.includes('|')) return aqul.reply(from, `Kirim gambar atau reply gambar dengan caption *${prefix}stickerwm nama|author*`, qul)
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					const packname1 = arg.split('|')[0]
					const author1 = arg.split('|')[1]
					exif.create(packname1, author1, `stickwm_${sender}`)
					aqul.reply(from, mess.wait, qul)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								aqul.reply(from, mess.error.api, qul)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return aqul.reply(from, mess.error.api, qul)
									aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)									
									fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
									fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else {
					aqul.reply(from, `Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`, id)
				}
				break
			case 'takestick':
				if (!isQuotedSticker) return aqul.reply(from, `Reply sticker dengan caption *${prefix}takestick nama|author*`, qul)
				const pembawm = body.slice(11)
				if (!pembawm.includes('|')) return aqul.reply(from, `Reply sticker dengan caption *${prefix}takestick nama|author*`, qul)
				const encmedia = JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				const media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
				const packname = pembawm.split('|')[0]
				const author = pembawm.split('|')[1]
				exif.create(packname, author, `takestick_${sender}`)
				exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
					if (error) return aqul.reply(from, mess.error.api, qul)
					aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)
					fs.unlinkSync(media)
					fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
				})
				break
	  		 case 'ephemeral'://DhyZx:v
				if (!q) return aqul.reply(from, 'textnya apa brohh', qul)
				xinz.sendMessage(from, `${q}`,
					MessageType.text, {
					sendEphemeral: true,
					thumbnail: fs.readFileSync('./media/aqul.jpeg')
					})
				break
			case 'colong':
				if (!isQuotedSticker) return aqul.reply(from, `Reply sticker dengan caption *${prefix}colong*`, qul)
				const encmediia = JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				const meidia = await xinz.downloadAndSaveMediaMessage(encmediia, `./sticker/${sender}`)
				exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
					if (error) return aqul.reply(from, mess.error.api, qul)
					aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)
					fs.unlinkSync(meidia)
				})
				break
			case 'hidetag':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}hidetag teks`, qul)
				aqul.hideTag(from, arg)
				break
			case 'runtime':
				run = process.uptime()
				let text = aqul.runtime(run)
				aqul.sendFakeStatus(from, text, `Runtime bro`)
				break
			case 'speed': case 'ping':
				let timestamp = speed();
				let latensi = speed() - timestamp
				aqul.sendFakeStatus(from, `Speed: ${latensi.toFixed(4)}second`, fake)
				break
			case 'mystat': case 'mystatus':
				let i = []
				let giid = []
				for (mem of totalchat){
					i.push(mem.jid)
				}
				for (id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
                let timestampi = speed();
				let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = xinz.user.phone
                anu = process.uptime()
                teskny = `*V. Whatsapp :* ${wa_version}
*Baterai :* ${baterai.baterai}%
*Charge :* ${baterai.cas === 'true' ? 'Ya' : 'Tidak'}
*RAM :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*MCC :* ${mcc}
*MNC :* ${mnc}
*Versi OS :* ${os_version}
*Merk HP :* ${device_manufacturer}
*Versi HP :* ${device_model}

*Group Chat :* ${giid.length}
*Personal Chat :* ${totalchat.length - giid.length}
*Total Chat :* ${totalchat.length}
*Speed :* ${latensii.toFixed(4)} Second
*Runtime :* ${aqul.runtime(anu)}`
				aqul.sendFakeStatus(from, teskny, fake)
				break
			case 'kontak':
				argz = arg.split('|')
				if (!argz) return aqul.reply(from, `Penggunaan ${prefix}kontak @tag atau nomor|nama`, qul)
				if (qul.message.extendedTextMessage != undefined){
                    mentioned = qul.message.extendedTextMessage.contextInfo.mentionedJid
					aqul.sendKontak(from, mentioned[0].split('@')[0], argz[1])
				} else {
					aqul.sendKontak(from, argz[0], argz[1])
				}
				break
			case 'beli':
			argi = arg.split('|')
				if (args.length < 1) return aqul.reply(from, `Penggunaan ${prefix}beli nickname|ID|OrderDM|SisaDM`, qul)
				if (!argi) return aqul.reply(from, `Penggunaan ${prefix}beli nickname|ID|OrderDM|SisaDM`, qul)
					aqul.sendFakeStatus(from, `
--------Format Pembayaran---------
*Nickname*: ${argi[0]}
*ID*: ${argi[1]}
*Order DM*: ${argi[2]}
*Sisa DM*: ${argi[3]}

\`\`\`WhatsApp \`\`\`: wa.me/${sender.split('@s.whatsapp.net')}
----------------------------------
`, fake)
				break
			case 'term':
				if (!itsMe) return
				if (!arg) return
				exec(arg, (err, stdout) => {
					if (err) return aqul.sendFakeStatus(from, err, fake)
					if (stdout) aqul.sendFakeStatus(from, stdout, fake)
				})
				break
			case 'setreply':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}setreply teks`, qul)
				fake = arg
				aqul.sendFakeStatus(from, `Sukses`, fake)
				break
			case 'setname':
				if (!itsMe) return
				if (!arg) return aqul.reply(from, 'masukkan nama', qul)
				aqul.setName(arg)
				.then((res) => aqul.sendFakeStatus(from, JSON.stringify(res), fake))
				.catch((err) => aqul.sendFakeStatus(from, JSON.stringify(err), fake))
				break
			case 'setbio':
				if (!itsMe) return
				if (!arg) return aqul.reply(from, 'masukkan bio', qul)
				aqul.setBio(arg)
				.then((res) => aqul.sendFakeStatus(from, JSON.stringify(res), fake))
				.catch((err) => aqul.sendFakeStatus(from, JSON.stringify(err), fake))
				break
			case 'fdeface': case 'hack':
				if (!arg) return aqul.reply(from, `Penggunaaan ${cprefix}fdeface url|title|desc|url\n\nContoh : ${cprefix}fdeface https://google.com|Self Bot|By aqulzz|https://aqul.com`, qul)
				argz = arg.split("|")
				if (!argz) return aqul.reply(from, `Penggunaaan ${cprefix}fdeface url|title|desc|url\n\nContoh : ${cprefix}fdeface https://google.com|Self Bot|By aqulzz|https://aqul.com`, qul)
				if ((isMedia && !qul.message.videoMessage || isQuotedImage)) {
					let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo : qul
					let media = await xinz.downloadMediaMessage(encmedia)
					aqul.sendFakeThumb(from, argz[0], argz[1], argz[2], argz[3], media)
				} else {
					aqul.sendFakeThumb(from, argz[0], argz[1], argz[2], argz[3])
				}
				break
        }*/
        ///////////////[With Prefix]//////////////////
	if (isCmd && !isGroup) {console.log(color('[CMD]'), color(moment(qul.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))}
        if (isCmd && isGroup) {console.log(color('[CMD]'), color(moment(qul.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(xinz.user.name), 'in', color(groupName))}
        switch (command) {
			case 'help':
        		aqul.sendFakeStatus(from, `Hallo, Sekarang bot C.A STORE memiliki 2 menu\n
Untuk *Menu 1* Silahkan ketik ${prefix}menu1. Menu pertama ini berisi List harga dan pembayaran\n
Untuk *Menu 2* Silahkan ketik ${prefix}menu2. Menu yg kedua ini bersisi berbagai macam fitur.`, fake)
        		break
        	case 'menu1':
        		textnya = ` C.A Store BOT
\`\`\`▢ ${prefix}ffid (List Harga DM FF)\`\`\`\n
\`\`\`▢ ${prefix}mlid (List Harga DM ML)\`\`\`
\`\`\`▢ ${prefix}payment (Nomor Pembayaran)\`\`\`
\`\`\`▢ ${prefix}beli Nickname|ID|OrderDM|SisaDM\`\`\`

*C.A Store*`
aqul.sendFakeStatus(from, textnya, fake)
				break
			case 'menu2':
				textnya = `	C.A Store BOT

\`\`\`▢ ${prefix}sticker\`\`\`
\`\`\`▢ ${prefix}trigger <reply gambar>\`\`\`
\`\`\`▢ ${prefix}triggered <url gambar>\`\`\`
\`\`\`▢ ${prefix}swm nama | author\`\`\`
\`\`\`▢ ${prefix}takestick nama | author\`\`\`
\`\`\`▢ ${prefix}colong <reply stiker>\`\`\`
\`\`\`▢ ${prefix}eval <java scripts>\`\`\`
\`\`\`▢ ${prefix}self\`\`\`
\`\`\`▢ ${prefix}public\`\`\`
\`\`\`▢ ${prefix}hidetag\`\`\`
\`\`\`▢ ${prefix}runtime\`\`\`
\`\`\`▢ ${prefix}speed\`\`\`
\`\`\`▢ ${prefix}mystat\`\`\`
\`\`\`▢ ${prefix}kontak\`\`\`
\`\`\`▢ ${prefix}hidetag\`\`\`
\`\`\`▢ ${prefix}term\`\`\`
\`\`\`▢ ${prefix}setreply\`\`\`
\`\`\`▢ ${prefix}setprefix\`\`\`
\`\`\`▢ ${prefix}setname\`\`\`
\`\`\`▢ ${prefix}setpp\`\`\`
\`\`\`▢ ${prefix}setbio\`\`\`
\`\`\`▢ ${prefix}fdeface\`\`\`
\`\`\`▢ ${prefix}fakethumbnail\`\`\`
\`\`\`▢ ${prefix}setthumb\`\`\`
\`\`\`▢ ${prefix}getpic\`\`\`
\`\`\`▢ ${prefix}stickertag\`\`\`
\`\`\`▢ ${prefix}imgtag\`\`\`
\`\`\`▢ ${prefix}kontaktag\`\`\`
\`\`\`▢ ${prefix}doctag\`\`\`
\`\`\`▢ ${prefix}giftag\`\`\`
\`\`\`▢ ${cprefix}apakah <pertanyaan>?\`\`\`
\`\`\`▢ ${prefix}tahta teks\`\`\`
\`\`\`▢ ${prefix}pubg teks1|teks2\`\`\`
\`\`\`▢ ${prefix}promote\`\`\`
\`\`\`▢ ${prefix}demote\`\`\`
\`\`\`▢ ${prefix}kick\`\`\`
\`\`\`▢ ${prefix}add\`\`\`
\`\`\`▢ ${prefix}creategrup nama|tag\`\`\`
\`\`\`▢ ${prefix}getgrup\`\`\`
\`\`\`▢ ${prefix}upstatus text\`\`\`
\`\`\`▢ ${prefix}tovideo\`\`\`
\`\`\`▢ ${prefix}togif\`\`\`
\`\`\`▢ ${prefix}spam teks|jumlah spam\`\`\`
\`\`\`▢ ${prefix}imgtourl\`\`\`
\`\`\`▢ ${prefix}ephemeral <teks>\`\`\`
\`\`\`▢ ${prefix}antidelete\`\`\`
\`\`\`▢ ${prefix}tourl <media>\`\`\`

*C.A Store*`
				aqul.sendFakeStatusWithImg(from, fakeimage, textnya, fake)
				break
			/*case 'apakah':
			case 'Apakah':
			buriq = arg.endsWith('?')
			if (!buriq) return aqul.sendFakeStatus(from, `Penggunaan: Apakah <pertanyaan>?`, fake)
			aqul.reply(from, `
*Pertanyaan:* ${buriq}
*Jawaban:* ${pickRandom(['Ya','Mungkin iya','Mungkin','Mungkin tidak','Tidak','Tidak mungkin','Mustahil!', '', 'Bisa jadi'])}
`, qul)
				break*/
            case 'test':
                aqul.sendText(from, 'oke')
				break
			case 'public':
				public = true
				aqul.sendFakeStatus(from, `Status: PUBLIC`, fake)
				break
			case 'exif':
				if (!itsMe) return
				if (args.length < 1) return aqul.reply(from, `Penggunaan ${prefix}exif nama|author`, qul)
				if (!arg.split('|')) return aqul.reply(from, `Penggunaan ${prefix}exif nama|author`, qul)
				exif.create(arg.split('|')[0], arg.split('|')[1])
				aqul.reply(from, 'sukses', qul)
				break
			case 'ffid':
			case 'ff':
				aqul.sendFakeStatus(from, `
\`\`\`📌 VIA ID\`\`\`
--------------------------------------------------
\`\`\`• 5💎    : 900\`\`\`
\`\`\`• 20💎   : 2.900\`\`\`
\`\`\`• 50💎   : 6.940\`\`\`
\`\`\`• 70💎   : 9.440\`\`\`
\`\`\`• 100💎  : 13.540\`\`\`
\`\`\`• 140💎  : 18.680\`\`\`
\`\`\`• 150💎  : 20.320\`\`\`
\`\`\`• 210💎  : 28.000\`\`\`
\`\`\`• 355💎  : 46.800\`\`\`
\`\`\`• 500💎  : 65.820\`\`\`
\`\`\`• 720💎  : 93.000\`\`\`
\`\`\`• 1000💎 : 130.360\`\`\`
\`\`\`• 1075💎 : 139.600\`\`\`
\`\`\`• 1440💎 : 185.800\`\`\`
\`\`\`• 2000💎 : 253.000\`\`\`
--------------------------------------------------
\`\`\`MEMBERSHIP\`\`\`
\`\`\`MINGGUAN : 28.200\`\`\`
\`\`\`BULANAN : 112.200\`\`\`
`, fake)
				break
			case 'mlid':
			case 'mlbb':
			case 'ml':
				aqul.sendFakeStatus(from, `
\`\`\`MOBILE LEGENDS BANG BANG\`\`\`
---------------------------------------------------------
\`\`\`86    💎 Rp 18.850\`\`\`
\`\`\`172   💎 Rp 36.375\`\`\`
\`\`\`257   💎 Rp 55.480\`\`\`
\`\`\`344   💎 Rp 73.500\`\`\`
\`\`\`429   💎 Rp 92.610\`\`\`
\`\`\`514   💎 Rp 112.100\`\`\`
\`\`\`706   💎 Rp 148.000\`\`\`
\`\`\`963   💎 Rp 202.100\`\`\`
\`\`\`1412  💎 Rp 292.000\`\`\`
---------------------------------------------------------
\`\`\`KONFIRMASI TERLEBIH DAHULU SEBELUM TRANSFER\`\`\`
---------------------------------------------------------
`, fake)
				break
				case 'owner':
			ownernya = `
Hallo, Mau minta nomor owner yg mana?
untuk owner pertama Silahkan ketik ${prefix}owner1
untuk owner kedua Silahkan ketik ${prefix}owner2
`
				aqul.reply(from, ownernya, qul)
				break
			case 'owner1':
				aqul.sendKontak(from, `62895373597911`, `Coklat Store (Musfi)`)
				break
			case 'owner2':
				aqul.sendKontak(from, `6282111170610`, `LA (Ari)`)
				//aqul.sendKontak(from, '6282111170610', 'LA (Ari)')
				break
			case 'trigger':
			//////////////////////////////////////////////////////////////////
				if (!isQuotedImage) return aqul.sendFakeStatus(from, `Reply gambarnya om :v`, qul)
					const mati = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const kau = await xinz.downloadAndSaveMediaMessage(mati, `./image/${Math.floor(Math.random() * 10000)}`)
        			const anjeng = await imgbb("bbd84b1e8f381e888d1bb48a8846637e", kau)
        			const url = `${anjeng.display_url}`
        			let ranp = getRandom('.gif')
        			let rano = getRandom('.webp')
        			let ashu = `${ranp}`
        			let kontol = `${rano}`
        			meki = `http://ahmadxx.herokuapp.com/api/trigger?url=${url}`
        				exec(`wget ${meki} -O ${ashu} && ffmpeg -i ${ashu} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${kontol}`, (err) => {
            			fs.unlinkSync(ashu)
            			if (err) return console.error(err)
            			//nobg xinz= fs.readFileSync(kontol)
            			aqul.sendSticker(from, fs.readFileSync(kontol), qul)
            			fs.unlinkSync(kontol)
            			fs.unlinkSync(kau)
        			})
        		/* @Params (url) //
        		// if (!isQuotedImage) return aqul.sendFakeStatus(from, `Reply gambarnya om :v`, qul)
				//	const mati = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
				//	const kau = await xinz.downloadAndSaveMediaMessage(mati, `./image/${Math.floor(Math.random() * 10000)}`)
        		//	const anjeng = await imgbb("bbd84b1e8f381e888d1bb48a8846637e", kau)
        		//	const url = `${anjeng.display_url}`
        		//	let ranp = getRandom('.gif')
        		//	let rano = getRandom('.webp')
        		//	let ashu = `${ranp}`
        		//	let kontol = `${rano}`
        		//	meki = `http://ahmadxx.herokuapp.com/api/trigger?url=${url}`
        		//		exec(`wget ${meki} -O ${ashu} && ffmpeg -i ${ashu} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${kontol}`, (err) => {
            	//		fs.unlinkSync(ashu)
            	//		if (err) return console.error(err)
            	//		//nobg xinz= fs.readFileSync(kontol)
            	//		aqul.sendSticker(from, fs.readFileSync(kontol), qul)
            	//		fs.unlinkSync(kontol)
            	//		fs.unlinkSync(owgi)
        		//	})*/
				break
			case 'triggered':
			//////////////////////////////////////////////////////////////////
				/*if (!asw) return aqul.sendFakeStatus(from, `Masukkan Link dengan benar`, qul)
					//const ansu = await imgbb("bbd84b1e8f381e888d1bb48a8846637e", owgi)
					const trg = await axios.get()
        			const url = `${anu.display_url}`
        			let ranp = getRandom('.gif')
        			let rano = getRandom('.webp')
        			let ashu = `${ranp}`
        			let kontol = `${rano}`
        			anu1 = `http://ahmadxx.herokuapp.com/api/trigger?url=${url}`
        				exec(`wget ${anu1} -O ${ashu} && ffmpeg -i ${ashu} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${kontol}`, (err) => {
            			fs.unlinkSync(ashu)
            			if (err) return console.error(err)
            			//nobg = fs.readFileSync(kontol)
            			aqul.sendSticker(from, fs.readFileSync(kontol), qul)
            			fs.unlinkSync(kontol)
            			fs.unlinkSync(owgi)
        			})*/
        			//////////////
        		if (!itsMe) return
        		if (!arg) return aqul.reply(from, `Penggunaan ${prefix}triggered <url gambar>`, qul)
				if (!isUrl) return aqul.reply(from, mess.error.url, qul)
					aqul.sendFakeStatus(from, mess.wait, fake)
					axios.get(`http://ahmadxx.herokuapp.com/api/trigger?url=${arg[0]}`)
					.then((res) => {
						aqul.sendFakeStatus(from, `Nih`, fake)
						//aqul.sendMediaURL(from, res.data.result.url)
						aqul.sendSticker(from, res.data.result.url, qul)
					})
					.catch((err) => {
						console.log(err)
						aqul.reply(from, mess.error.api, qul)
					})
					.save(`./sticker/${getRandom}`)
        		break
				/////////////////////////////
				//belajar xnxx
			/*case 'xnxx':
			if (!asw) return aqul.sendFakeStatus(from, `Masukkan Linknya`)
				try {
                    aqul.sendFakeStatus(from, mess.wait, qul)
                    const webplay = await fetch(`https://api.lolhuman.xyz/api/xnxx?apikey=8308af29ac83b4257fb74e42&url=${bokep}`)
                    if (!webplay.ok) throw new Error(`Error Get Video : ${webplay.statusText}`)
                    const webplay2 = await webplay.json()
                	const bokep = `${arg}`
                    if (webplay2.status == false) {
                        aqul.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon masukkan link yg valid*`, id)
                    } else {	
                        const { title, mp4, rating, tag, duration } = await webplay2.result
                        const captplay = `*「 PLAY 」*\n\n➸ *Judul* : ${title}\n➸ *Durasi* : ${duration}\n➸ *Rating* : ${$rating}\n➸ *Tag* : ${tag}\n\n_*Saat ini Video belum dapat di kirim*_`
                        aqul.sendMediaURL(from, image, `thumbnail.jpg`, captplay, qul)
                        await aqul.sendMediaURL(from, mp3, `${title}.mp3`, '', qul).catch(() => aqul.reply(from, mess.error.api, qul))
                    }
                } catch (err) {
                    aqul.sendFakeStatus(from, 'Error Play : ' + err, qul)
                    aqul.reply(from, 'Yah error coba lain waktu :(', qul)
                }
                break*/
            case 'payment':
            case 'pay':
            case 'p':
            pembayaran = `
PAYMENT 💳:
\`\`\`GOPAY 1: 0895373597911 || Coklat Store\`\`\`
\`\`\`GOPAY 2: 082111170610  || Laksamana Arianda\`\`\`
\`\`\`DANA  1: 085727206718  || Masuroh\`\`\`
\`\`\`DANA  2: 082111170610  || Laksamana Arianda\`\`\`
\`\`\`OVO    : 082111170610  || Sumiyati\`\`\`

*Mohon Sertakan Bukti Tf Agar Cepat Di Proses*🙏
`
            aqul.sendFakeStatus(from, pembayaran, fake)
            	break
			case 'sticker':
			case 'stiker':
			case 's':
				if (isMedia && !qul.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								aqul.reply(from, mess.error.api, qul)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return aqul.reply(from, mess.error.api, qul)
									aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)
									fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else if ((isMedia && qul.message.videoMessage.fileLength < 10000000 || isQuotedVideo && qul.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					aqul.reply(from, mess.wait, qul)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								aqul.reply(from, mess.error.api, qul)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return aqul.reply(from, mess.error.api, qul)
									aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)
									fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else {
					aqul.reply(from, `Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`, qul)
				}
				break
			case 'swm':
			case 'stickerwm':
				if (isMedia && !qul.message.videoMessage || isQuotedImage) {
					if (!arg.includes('|')) return aqul.reply(from, `Kirim gambar atau reply gambar dengan caption *${prefix}stickerwm nama|author*`, qul)
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					const packname1 = arg.split('|')[0]
					const author1 = arg.split('|')[1]
					exif.create(packname1, author1, `stickwm_${sender}`)
					await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								aqul.reply(from, mess.error.api, qul)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return aqul.reply(from, mess.error.api, qul)
									aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)
									fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
									fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else if ((isMedia && qul.message.videoMessage.fileLength < 10000000 || isQuotedVideo && qul.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
					if (!arg.includes('|')) return aqul.reply(from, `Kirim gambar atau reply gambar dengan caption *${prefix}stickerwm nama|author*`, qul)
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					const packname1 = arg.split('|')[0]
					const author1 = arg.split('|')[1]
					exif.create(packname1, author1, `stickwm_${sender}`)
					aqul.reply(from, mess.wait, qul)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								aqul.reply(from, mess.error.api, qul)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return aqul.reply(from, mess.error.api, qul)
									aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)									
									fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
									fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
				} else {
					aqul.reply(from, `Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`, id)
				}
				break
			case 'takestick':
				if (!isQuotedSticker) return aqul.reply(from, `Reply sticker dengan caption *${prefix}takestick nama|author*`, qul)
				const pembawm = body.slice(11)
				if (!pembawm.includes('|')) return aqul.reply(from, `Reply sticker dengan caption *${prefix}takestick nama|author*`, qul)
				const encmedia = JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				const media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
				const packname = pembawm.split('|')[0]
				const author = pembawm.split('|')[1]
				exif.create(packname, author, `takestick_${sender}`)
				exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
					if (error) return aqul.reply(from, mess.error.api, qul)
					aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)
					fs.unlinkSync(media)
					fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
				})
				break
	  		 case 'ephemeral'://DhyZx:v
				if (!q) return aqul.reply(from, 'textnya apa brohh', qul)
				xinz.sendMessage(from, `${q}`,
					MessageType.text, {
					sendEphemeral: true,
					thumbnail: fs.readFileSync('./media/aqul.jpeg')
					})
				break
			case 'colong':
				if (!isQuotedSticker) return aqul.reply(from, `Reply sticker dengan caption *${prefix}colong*`, qul)
				const encmediia = JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				const meidia = await xinz.downloadAndSaveMediaMessage(encmediia, `./sticker/${sender}`)
				exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
					if (error) return aqul.reply(from, mess.error.api, qul)
					aqul.sendSticker(from, fs.readFileSync(`./sticker/${sender}.webp`), qul)
					fs.unlinkSync(meidia)
				})
				break
			case 'hidetag':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}hidetag teks`, qul)
				aqul.hideTag(from, arg)
				break
			case 'runtime':
				run = process.uptime()
				let text = aqul.runtime(run)
				aqul.sendFakeStatus(from, text, `Runtime bro`)
				break
			case 'speed': case 'ping':
				let timestamp = speed();
				let latensi = speed() - timestamp
				aqul.sendFakeStatus(from, `Speed: ${latensi.toFixed(4)}second`, fake)
				break
			case 'mystat': case 'mystatus':
				let i = []
				let giid = []
				for (mem of totalchat){
					i.push(mem.jid)
				}
				for (id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
                let timestampi = speed();
				let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = xinz.user.phone
                anu = process.uptime()
                teskny = `*V. Whatsapp :* ${wa_version}
*Baterai :* ${baterai.baterai}%
*Charge :* ${baterai.cas === 'true' ? 'Ya' : 'Tidak'}
*RAM :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*MCC :* ${mcc}
*MNC :* ${mnc}
*Versi OS :* ${os_version}
*Merk HP :* ${device_manufacturer}
*Versi HP :* ${device_model}

*Group Chat :* ${giid.length}
*Personal Chat :* ${totalchat.length - giid.length}
*Total Chat :* ${totalchat.length}
*Speed :* ${latensii.toFixed(4)} Second
*Runtime :* ${aqul.runtime(anu)}`
				aqul.sendFakeStatus(from, teskny, fake)
				break
			case 'kontak':
				/*argz = arg.split('|')
				if (!argz) return aqul.reply(from, `Penggunaan ${prefix}kontak @tag atau nomor|nama`, qul)
				
                    mentioned = qul.message.extendedTextMessage.contextInfo.mentionedJid
					aqul.sendKontak(from, mentioned[0].split('@')[0], argz[1])
				} else {
					if (qul.message.extendedTextMessage != undefined){aqul.sendKontak(from, argz[0], argz[1])
				}*/
				argz = arg.split('|')
				if (!argz) return aqul.reply(from, `Penggunaan ${prefix}kontak @tag atau nomor|nama`, qul)
				if (qul.message.extendedTextMessage != undefined){
                    mentioned = qul.message.extendedTextMessage.contextInfo.mentionedJid
					aqul.sendKontak(from, mentioned[0].split('@')[0], argz[1])
				} else {
					aqul.sendKontak(from, argz[0], argz[1])
				}
				break
			case 'beli':
			argi = arg.split('|')
				if (args.length < 3) return aqul.reply(from, `Penggunaan ${prefix}beli nickname|ID|OrderDM|SisaDM`, qul)
				if (!argi) return aqul.reply(from, `Penggunaan ${prefix}beli nickname|ID|OrderDM|SisaDM`, qul)
					aqul.sendFakeStatus(from, `
--------Format Pembayaran---------
*Nickname*: ${argi[0]}
*ID*: ${argi[1]}
*Order DM*: ${argi[2]}
*Sisa DM*: ${argi[3]}

\`\`\`WhatsApp \`\`\`: wa.me/${sender.split('@s.whatsapp.net')}
----------------------------------
`, fake)
				break
			case 'term':
				if (!itsMe) return
				if (!arg) return
				exec(arg, (err, stdout) => {
					if (err) return aqul.sendFakeStatus(from, err, fake)
					if (stdout) aqul.sendFakeStatus(from, stdout, fake)
				})
				break
			case 'setreply':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}setreply teks`, qul)
				fake = arg
				aqul.sendFakeStatus(from, `Sukses`, fake)
				break
			case 'setprefix':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}setprefix prefix`, qul)
				prefix = arg
				aqul.sendFakeStatus(from, `Prefix berhasil diubah menjadi ${prefix}`, fake)
				break
			case 'setname':
				if (!itsMe) return
				if (!arg) return aqul.reply(from, 'masukkan nama', qul)
				aqul.setName(arg)
				.then((res) => aqul.sendFakeStatus(from, JSON.stringify(res), fake))
				.catch((err) => aqul.sendFakeStatus(from, JSON.stringify(err), fake))
				break
			case 'setbio':
				if (!itsMe) return
				if (!arg) return aqul.reply(from, 'masukkan bio', qul)
				aqul.setBio(arg)
				.then((res) => aqul.sendFakeStatus(from, JSON.stringify(res), fake))
				.catch((err) => aqul.sendFakeStatus(from, JSON.stringify(err), fake))
				break
			case 'fdeface': case 'hack':
				if (!arg) return aqul.reply(from, `Penggunaaan ${prefix}fdeface url|title|desc|url\n\nContoh : ${prefix}fdeface https://google.com|Self Bot|By aqulzz|https://aqul.com`, qul)
				argz = arg.split("|")
				if (!argz) return aqul.reply(from, `Penggunaaan ${prefix}fdeface url|title|desc|url\n\nContoh : ${prefix}fdeface https://google.com|Self Bot|By aqulzz|https://aqul.com`, qul)
				if ((isMedia && !qul.message.videoMessage || isQuotedImage)) {
					let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo : qul
					let media = await xinz.downloadMediaMessage(encmedia)
					aqul.sendFakeThumb(from, argz[0], argz[1], argz[2], argz[3], media)
				} else {
					aqul.sendFakeThumb(from, argz[0], argz[1], argz[2], argz[3])
				}
				break
			case 'fakethumbnail': case 'fthumbnail': case 'fakethumb':
				if ((isMedia && !qul.message.videoMessage || isQuotedImage)) {
					let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo : qul
					let media = await xinz.downloadMediaMessage(encmedia)
					aqul.sendFakeImg(from, media, arg, fakeimage, qul)
				} else {
					aqul.reply(from, `Kirim gambar atau reply dengan caption ${prefix}fakethumb caption`, qul)
				}
				break
			case 'setthumb':
				boij = JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await xinz.downloadMediaMessage(boij)
				fs.writeFileSync(`./media/aqul.jpeg`, delb)
				fakeimage = fs.readFileSync(`./media/aqul.jpeg`)
				aqul.sendFakeStatus(from, `Sukses`, fake)
				break
			case 'getpic':
				if (qul.message.extendedTextMessage != undefined){
					mentioned = qul.message.extendedTextMessage.contextInfo.mentionedJid
					try {
						pic = await xinz.getProfilePicture(mentioned[0])
					} catch {
						pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
					}
					thumb = await aqul.getBuffer(pic)
					aqul.sendImage(from, thumb)
				}
				break
			case 'imgtag':
				if ((isMedia && !qul.message.videoMessage || isQuotedImage)) {
					let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo : qul
					let media = await xinz.downloadMediaMessage(encmedia)
					aqul.hideTagImg(from, media)
				} else {
					aqul.reply(from, `Kirim gambar atau reply dengan caption ${prefix}imgtag caption`, qul)
				}
				break
			case 'sticktag': case 'stickertag':
				if (!isQuotedSticker) return aqul.reply(from, `Reply sticker dengan caption *${prefix}stickertag*`, qul)
				let encmediai = JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				let mediai = await xinz.downloadMediaMessage(encmediai)
				aqul.hideTagSticker(from, mediai)
				break
			case 'kontaktag':
				argz = arg.split('|')
				if (!argz) return aqul.reply(from, `Penggunaan ${prefix}kontak @tag atau nomor|nama`, qul)
				if (qul.message.extendedTextMessage != undefined){
                    mentioned = qul.message.extendedTextMessage.contextInfo.mentionedJid
					aqul.hideTagKontak(from, mentioned[0].split('@')[0], argz[1])
				} else {
					aqul.hideTagKontak(from, argz[0], argz[1])
				}
				break
			case 'doctag':  case 'dokumentag': //by Dehanjing
		        if (!isQuotedDocument) return aqul.reply(from, `Reply Document dengan caption *${prefix + command}*`, qul)
                quoted = JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                download = await xinz.downloadMediaMessage(quoted)
                await fs.writeFileSync(`doc.txt`, download)
                var group = await xinz.groupMetadata(from)
                var member = group['participants']
                var mem = []
                member.map(async adm => {
                mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                })
                xinz.sendMessage(from, fs.readFileSync(`doc.txt`), document, { contextInfo: {mentionedJid: mem }, quoted: qul, mimetype: 'text/plain' })
			    await fs.unlinkSync(`doc.txt`)
			    break
		    case 'giftag':   case 'giphytag': //by Dehanjing
                if (!isQuotedVideo) return reply(`Reply Gif nya dengan caption ${prefix + command}`)
                quoted = JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                download = await xinz.downloadMediaMessage(quoted)
                await fs.writeFileSync(`giftag.gif`, download)
                var group = await xinz.groupMetadata(from)
                var member = group['participants']
                var mem = []
                member.map(async adm => {
                mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                })
                thumb = fs.readFileSync(`giftag.gif`)
                xinz.sendMessage(from, thumb, video, { contextInfo: {mentionedJid: mem }, quoted: qul, mimetype: 'video/gif', thumbnail: thumb })
			    await fs.unlinkSync(`giftag.gif`)
			    break
			case 'tahta':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}tahta teks`, qul)
				aqul.sendMediaURL(from, `https://api.zeks.xyz/api/hartatahta?text=${arg}&apikey=apivinz`)
				break
			case 'pubg':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}pubg teks1|teks2`, qul)
				argz = arg.split("|")
				if (!argz) return aqul.reply(from, `Penggunaan ${prefix}pubg teks1|teks2`, qul)
				axios.get(`https://xinzbot-api.herokuapp.com/api/textmaker/game?text=${argz[0]}&text2=${argz[1]}&theme=pubg&apikey=XinzBot`)
				.then((res) => aqul.sendMediaURL(from, res.data.result.url))
				.catch((err) => {
					console.log(err)
					aqul.reply(from, mess.error.api, qul)
				})
				break
			case 'togif':
				if (!isQuotedSticker) return reply(from, 'Reply stiker nya', qul)
				if (qul.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === true){
					const encmedia = JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					const media = await xinz.downloadAndSaveMediaMessage(encmedia)
					const uploadn = await uptonaufal(media, Date.now() + '.webp')
					const anjj = await axios.get(`http://nzcha-apii.herokuapp.com/webp-to-mp4?url=${uploadn.result.image}`)
					thumb = await aqul.getBuffer(anjj.data.result)
					aqul.sendGif(from, thumb)
					fs.unlinkSync(media)
				} else {
					aqul.reply(from, `Harus sticker bergerak`, qul)
				}
				break
			case 'toimg': case 'tovideo':
				if (!isQuotedSticker) return aqul.reply(from, 'Reply stiker nya', qul)
				if (qul.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === true){
					const encmedia = JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					const media = await xinz.downloadAndSaveMediaMessage(encmedia)
					const uploadn = await uptonaufal(media, Date.now() + '.webp')
					const anjj = await axios.get(`http://nzcha-apii.herokuapp.com/webp-to-mp4?url=${uploadn.result.image}`)
					await aqul.sendMediaURL(from, anjj.data.result, 'Nih')
					fs.unlinkSync(media)
				} else {
					const encmedia = JSON.parse(JSON.stringify(qul).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					const media = await xinz.downloadAndSaveMediaMessage(encmedia)
					ran = aqul.getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) {
							aqul.reply(from, `gagal`, qul)
							fs.unlinkSync(ran)
						} else {
							buffer = fs.readFileSync(ran)
							aqul.sendImage(from, buffer, 'nih', qul)
							fs.unlinkSync(ran)
						}
					})
				}
				break
			case 'shutdown':
				await aqul.FakeTokoForwarded(from, `Bye...`, fake)
				await aqul.sleep(5000)
				xinz.close()
				break
			case 'spam':
				if (!itsMe) return
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}spam teks|jumlahspam`, qul)
				argz = arg.split("|")
				if (!argz) return aqul.reply(from, `Penggunaan ${prefix}spam teks|jumlah`, qul)
				if (isNaN(argz[1])) return aqul.reply(from, `harus berupa angka`, qul)
				for (let i = 0; i < argz[1]; i++){
					aqul.sendText(from, argz[0])
				}
				break
			case 'promote':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}promote @tag atau nomor`, qul)
				if (qul.message.extendedTextMessage != undefined){
                    mentioned = qul.message.extendedTextMessage.contextInfo.mentionedJid
					await aqul.FakeTokoForwarded(from, `sukses`, fake)
					aqul.promote(from, mentioned)
				} else {
					await aqul.FakeTokoForwarded(from, `sukses`, fake)
					aqul.promote(from, [args[0] + '@s.whatsapp.net'])
				}
				break
			case 'demote':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}demote @tag atau nomor`, qul)
				if (qul.message.extendedTextMessage != undefined){
                    mentioned = qul.message.extendedTextMessage.contextInfo.mentionedJid
					await aqul.FakeTokoForwarded(from, `sukses`, fake)
					aqul.demote(from, mentioned)
				} else {
					await aqul.FakeTokoForwarded(from, `sukses`, fake)
					aqul.demote(from, [args[0] + '@s.whatsapp.net'])
				}
				break
			case 'kick':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}kick @tag atau nomor`, qul)
				if (qul.message.extendedTextMessage != undefined){
                    mentioned = qul.message.extendedTextMessage.contextInfo.mentionedJid
					await aqul.FakeTokoForwarded(from, `Bye...`, fake)
					aqul.kick(from, mentioned)
				} else {
					await aqul.FakeTokoForwarded(from, `Bye...`, fake)
					aqul.kick(from, [args[0] + '@s.whatsapp.net'])
				}
				break
			case 'add':
				if (!arg) return aqul.reply(from, `Penggunaan ${prefix}add 628xxxx`, qul)
				aqul.add(from, [args[0] + '@s.whatsapp.net'])
				aqul.FakeTokoForwarded(from, `Sukses`, fake)
				break
			case 'upstatus':
				if (!itsMe) return
				if (!arg) return aqul.reply(from, `Penggunaan \n${prefix}upstatus text\n${prefix}upstatus caption <reply atau kirim video / img>`, qul)
				if (isMedia && !qul.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadAndSaveMediaMessage(encmedia)
					aqul.upImgStatus(media, arg).then(() => { aqul.FakeTokoForwarded(from, 'Sukses', fake) })
				} else if ((isMedia || isQuotedVideo )) {
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadAndSaveMediaMessage(encmedia)
					aqul.upVidStatus(media, arg).then(() => { aqul.FakeTokoForwarded(from, 'Sukses', fake) })
				} else {
					await aqul.upTextStatus(arg).then(() => { aqul.FakeTokoForwarded(from, 'Sukses', fake) })
				}
				break
			case 'getgrup': case 'getgroup': case 'getg':
				const ingfo = await aqul.getGroup(totalchat)
				let txt = `Ingfo grup\nJumlah Grup: ${ingfo.length}\n\n`
				for (let i = 0; i < ingfo.length; i++){
					txt += `Nama grup : ${ingfo[i].subject}\nID grup : ${ingfo[i].id}\nDibuat : ${moment(`${ingfo[i].creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\nJumlah Peserta : ${ingfo[i].participants.length}\n\n`
				}
				aqul.FakeTokoForwarded(from, txt, fake)
				break
			case 'creategrup': case 'creategroup': case 'createg':
				argz = arg.split('|')
				if (qul.message.extendedTextMessage != undefined){
                    mentioned = qul.message.extendedTextMessage.contextInfo.mentionedJid
					xinz.groupCreate(argz[0], mentioned)
					.then((res) => aqul.FakeTokoForwarded(from, JSON.stringify(res, null, 2).toString(), fake))
					.catch((err) => console.log(err))
				} else {
					aqul.reply(from, `Penggunaan ${prefix}creategrup namagrup|@tag`, qul)
				}
				break
			case 'imgtourl':
				const encmediiia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
				const mediaq = await xinz.downloadMediaMessage(encmediiia)
				const upli = await uptotele(mediaq)
				aqul.reply(from, `${upli}`, qul)
				break
			case 'tourl':
				let a = JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				let b = await xinz.downloadAndSaveMediaMessage(a)
				let c = await uploadFile(b)
				aqul.reply(from, c.result, qul)
				fs.unlinkSync(b)
				break
			case 'antidelete':
				if (!itsMe) return
				const dataRevoke = JSON.parse(fs.readFileSync('./antidelete/gc-revoked.json'))
				const dataCtRevoke = JSON.parse(fs.readFileSync('./antidelete/ct-revoked.json'))
				const dataBanCtRevoke = JSON.parse(fs.readFileSync('./antidelete/ct-revoked-banlist.json'))
				const isRevoke = dataRevoke.includes(from)
				const isCtRevoke = dataCtRevoke.data
				const isBanCtRevoke = dataBanCtRevoke.includes(sender) ? true : false
				if (args.length === 0) return xinz.sendMessage(from, `Penggunaan fitur antidelete :\n\n*${prefix}antidelete [aktif/mati]* (Untuk grup)\n*${prefix}antidelete [ctaktif/ctmati]* (untuk semua kontak)\n*${prefix}antidelete banct 628558xxxxxxx* (banlist kontak)`, MessageType.text)
				if (args[0] == 'aktif') {
					if (isGroup) {
						if (isRevoke) return xinz.sendMessage(from, `Antidelete telah diaktifkan di grup ini sebelumnya!`, MessageType.text)
						dataRevoke.push(from)
						fs.writeFileSync('./antidelete/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						xinz.sendMessage(from, `*Succes Enable Antidelete Grup!*`, MessageType.text)
					} else if (!isGroup) {
						xinz.sendMessage(from, `Untuk kontak penggunaan *${prefix}antidelete ctaktif*`, MessageType.text)
					}
				} else if (args[0] == 'ctaktif') {
					if (!isGroup) {
						if (isCtRevoke) return xinz.sendMessage(from, `Antidelete telah diaktifkan di semua kontak sebelumnya!`, MessageType.text)
						dataCtRevoke.data = true
						fs.writeFileSync('./antidelete/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						xinz.sendMessage(from, `Antidelete diaktifkan disemua kontak!`, MessageType.text)
					} else if (isGroup) {
						xinz.sendMessage(from, `Untuk grup penggunaan *${prefix}antidelete aktif*`, MessageType.text)
					}
				} else if (args[0] == 'banct') {
					if (isBanCtRevoke) return xinz.sendMessage(from, `kontak ini telah ada di database banlist!`, MessageType.text)
					if (args.length === 1 || args[1].startsWith('0')) return xinz.sendMessage(from, `Masukan nomer diawali dengan 62! contoh 62859289xxxxx`, MessageType.text)
					dataBanCtRevoke.push(args[1] + '@s.whatsapp.net')
					fs.writeFileSync('./antidelete/ct-revoked-banlist.json', JSON.stringify(dataBanCtRevoke, null, 2))
					xinz.sendMessage(from, `Kontak ${args[1]} telah dimasukan ke banlist antidelete secara permanen!`, MessageType.text)
				} else if (args[0] == 'mati') {
					if (isGroup) {
						const index = dataRevoke.indexOf(from)
						dataRevoke.splice(index, 1)
						fs.writeFileSync('./antidelete/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						xinz.sendMessage(from, `*Succes disable Antidelete Grup!*`, MessageType.text)
					} else if (!isGroup) {
						xinz.sendMessage(from, `Untuk kontak penggunaan *${prefix}antidelete ctmati*`, MessageType.text)
					}
				} else if (args[0] == 'ctmati') {
					if (!isGroup) {
						dataCtRevoke.data = false
						fs.writeFileSync('./antidelete/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						xinz.sendMessage(from, `Antidelete dimatikan disemua kontak!`, MessageType.text)
					} else if (isGroup) {
						xinz.sendMessage(from, `Untuk grup penggunaan *${prefix}antidelete mati*`, MessageType.text)
					}
				}
				break
			case 'setpp': case 'setprofilepicture':
				if (!itsMe) return
				if (isMedia && !qul.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(qul).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : qul
					const media = await xinz.downloadMediaMessage(encmedia)
					xinz.updateProfilePicture(xinz.user.jid, media)
					.then((res) => aqul.FakeTokoForwarded(from, JSON.stringify(res, null, 2).toString(), fake))
					.catch((err) => console.log(err))
				} else {
					aqul.reply(from, `Kirim gambar atau reply gambar dengan caption ${prefix}setpp`, qul)
				}
				break
			case 'eval':
				if (!itsMe) return
				let code = body.slice(6)
				try {

					if (!code) return aqul.reply(from, 'No JavaScript Code', qul)
					let evaled;

					if (code.includes("--silent") && code.includes("--async")) {
						code = code.replace("--async", "").replace("--silent", "");

						return await eval(`(async () => { ${code} })()`)
					} else if (code.includes("--async")) {
						code = code.replace("--async", "");

						evaled = await eval(`(async () => { ${code} })()`);
					} else if (code.includes("--silent")) {
						code = code.replace("--silent", "");

						return await eval(code);
					} else evaled = await eval(code);

					/*if (typeof evaled !== "string")
						evaled = require("util").inspect(evaled, {
							depth: 0
						*/

					let output = clean(evaled);
					aqul.reply(from, JSON.stringify(evaled, null, 2), qul)

				} catch (err) {
					console.error(err)
					const error = clean(err)
					aqul.reply(from, error, qul)
				}

				function clean(text) {
					if (typeof text === "string")
						return text
							.replace(/`/g, `\`${String.fromCharCode(8203)}`)
							.replace(/@/g, `@${String.fromCharCode(8203)}`);
					// eslint-disable-line prefer-template
					else return text;
				}
				break
			default:
				break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
})
const getRandom = (ext) => {
        			return `${Math.floor(Math.random() * 10000)}${ext}`
        		}
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}