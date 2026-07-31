function initClassicModalDialog() {
  const sectionElement = document.querySelector("#classic-modal-dialog-section")!
  const openButton = sectionElement.querySelector("[data-open-modal]")! as HTMLButtonElement
  const closeButton = sectionElement.querySelector("[data-close-modal]")! as HTMLButtonElement
  const dialog = sectionElement.querySelector("[data-modal]")!
  const overlay = sectionElement.querySelector("[data-overlay]")!

  openButton.addEventListener("click", () => {
    dialog.classList.add("open")
    overlay.classList.add("open")
  })

  closeButton.addEventListener("click", () => {
    dialog.classList.remove("open")
    overlay.classList.remove("open")
  })
}

function initHtmlNonModalDialog() {
  const sectionElement = document.querySelector("#html-non-modal-dialog-section")!
  const openButton = sectionElement.querySelector("[data-open-modal]")! as HTMLButtonElement
  const closeButton = sectionElement.querySelector("[data-close-modal]")! as HTMLButtonElement
  const dialog = sectionElement.querySelector("[data-modal]")! as HTMLDialogElement

  openButton.addEventListener("click", () => {
    dialog.show()
  })

  closeButton.addEventListener("click", () => {
    dialog.close()
  })
}

function initHtmlModalDialog() {
  const sectionElement = document.querySelector("#html-modal-dialog-section")!
  const openButton = sectionElement.querySelector("[data-open-modal]")! as HTMLButtonElement
  const dialog = sectionElement.querySelector("[data-modal]")! as HTMLDialogElement

  openButton.addEventListener("click", () => {
    dialog.showModal()
  })

  dialog.addEventListener("click", (e) => {
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
  })
}

function main() {
  initClassicModalDialog()
  initHtmlNonModalDialog()
  initHtmlModalDialog()
}

main()
