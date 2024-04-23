import {Icon, IconData} from "@/types/common";

export const useIcon = (icon: Icon): IconData => {
    switch (icon) {
        case "submit":
            return {
                src: "src/assets/icons.svg#submit",
                alt: "Submit"
            }
        case "warning":
            return {
                src: "src/assets/icons.svg#warning",
                alt: "Warning"
            }
        case "cross":
            return {
                src: "src/assets/icons.svg#cross",
                alt: "Cancel"
            }
        case "avatar":
            return {
                src: "src/assets/icons.svg#avatar",
                alt: "Avatar"
            }
        case "delete":
            return {
                src: "src/assets/icons.svg#delete",
                alt: "Delete"
            }
        case "alert":
            return {
                src: "src/assets/icons.svg#alert",
                alt: "Alert"
            }
        case "info":
            return {
                src: "src/assets/icons.svg#info",
                alt: "Info"
            }
        case "theme":
            return {
                src: "src/assets/icons.svg#theme",
                alt: "Theme"
            }
        default:
            return {
                src: "src/assets/icons.svg#default",
                alt: "Icon not found"
            }
    }
}