var speechRecognition = window.webkitSpeechRecognition
var recognition = new speechRecognition()
var textbox = $("#textbox")
var instructions = $("#instructions")
var content = ''
recognition.lang = 'ar';
recognition.continuous = true
recognition.onstart = function() {
    instructions.text("التعرف على الصوت قيد التشغيل")
}
recognition.onspeechend = function() {
    instructions.text("لا يوجد تفاعل")
}
recognition.onerror = function() {
    instruction.text("حاول مرة آخرى")
}
recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript
    content += transcript
    textbox.val(content)
}
$("#start-btn").click(function(event) {
    recognition.start()
})
textbox.on('input', function() {
    content = $(this).val()
})

async function connect() {

    // Prompt user to select any serial port.
    const port = await navigator.serial.requestPort();

    // Wait for the serial port to open.
    await port.open({ baudRate: 9600 });

    const textEncoder = new TextEncoderStream();
    const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

    const writer = textEncoder.writable.getWriter();

    let msg = document.getElementById('info').innerText;
    await writer.write(msg);

    // Allow the serial port to be closed later.
    writer.releaseLock();
}