const editButton = document.querySelector("#editButton")
        const campgroundDisplay = document.querySelector("#campgroundDisplay")
        const campgroundEdit = document.querySelector("#campgroundEdit")
        editButton.addEventListener("click", () => {
            if (editButton.innerHTML === "Edit campground") {
                campgroundDisplay.setAttribute("style", "display: none")
                campgroundEdit.setAttribute("style", "display: block")
                editButton.innerHTML = "Cancel editing"
                editButton.setAttribute("class", "my-1 btn btn-outline-warning")
            } else {
                campgroundDisplay.setAttribute("style", "display: block")
                campgroundEdit.setAttribute("style", "display: none")
                editButton.innerHTML = "Edit campground"
                editButton.setAttribute("class", "my-1 btn btn-outline-success")
            }
        })