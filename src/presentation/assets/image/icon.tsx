import { IconProps } from "@/app/types";

export default function Icon({ type, onClick }: { type: IconProps, onClick?: () => void}) {
    switch (type) {
        case "trash":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.9999 4.00004H10.6666V2.88671C10.6509 2.45992 10.4667 2.05675 10.1543 1.76557C9.84188 1.47439 9.42675 1.31897 8.99992 1.33338H6.99992C6.57309 1.31897 6.15796 1.47439 5.84554 1.76557C5.53312 2.05675 5.34889 2.45992 5.33325 2.88671V4.00004H1.99992C1.82311 4.00004 1.65354 4.07028 1.52851 4.19531C1.40349 4.32033 1.33325 4.4899 1.33325 4.66671C1.33325 4.84352 1.40349 5.01309 1.52851 5.13812C1.65354 5.26314 1.82311 5.33338 1.99992 5.33338H2.66659V12.6667C2.66659 13.1971 2.8773 13.7059 3.25237 14.0809C3.62744 14.456 4.13615 14.6667 4.66658 14.6667H11.3333C11.8637 14.6667 12.3724 14.456 12.7475 14.0809C13.1225 13.7059 13.3333 13.1971 13.3333 12.6667V5.33338H13.9999C14.1767 5.33338 14.3463 5.26314 14.4713 5.13812C14.5963 5.01309 14.6666 4.84352 14.6666 4.66671C14.6666 4.4899 14.5963 4.32033 14.4713 4.19531C14.3463 4.07028 14.1767 4.00004 13.9999 4.00004ZM6.66658 2.88671C6.66658 2.78004 6.80658 2.66671 6.99992 2.66671H8.99992C9.19325 2.66671 9.33325 2.78004 9.33325 2.88671V4.00004H6.66658V2.88671ZM11.9999 12.6667C11.9999 12.8435 11.9297 13.0131 11.8047 13.1381C11.6796 13.2631 11.5101 13.3334 11.3333 13.3334H4.66658C4.48977 13.3334 4.3202 13.2631 4.19518 13.1381C4.07016 13.0131 3.99992 12.8435 3.99992 12.6667V5.33338H11.9999V12.6667Z" fill="white" />
                    <path d="M5.99992 11.3333C6.17673 11.3333 6.3463 11.2631 6.47132 11.1381C6.59635 11.013 6.66659 10.8435 6.66659 10.6666V7.99998C6.66659 7.82317 6.59635 7.6536 6.47132 7.52858C6.3463 7.40355 6.17673 7.33331 5.99992 7.33331C5.82311 7.33331 5.65354 7.40355 5.52851 7.52858C5.40349 7.6536 5.33325 7.82317 5.33325 7.99998V10.6666C5.33325 10.8435 5.40349 11.013 5.52851 11.1381C5.65354 11.2631 5.82311 11.3333 5.99992 11.3333Z" fill="white" />
                    <path d="M9.99992 11.3333C10.1767 11.3333 10.3463 11.2631 10.4713 11.1381C10.5963 11.013 10.6666 10.8435 10.6666 10.6666V7.99998C10.6666 7.82317 10.5963 7.6536 10.4713 7.52858C10.3463 7.40355 10.1767 7.33331 9.99992 7.33331C9.82311 7.33331 9.65354 7.40355 9.52851 7.52858C9.40349 7.6536 9.33325 7.82317 9.33325 7.99998V10.6666C9.33325 10.8435 9.40349 11.013 9.52851 11.1381C9.65354 11.2631 9.82311 11.3333 9.99992 11.3333Z" fill="white" />
                </svg>
            )
        case "correct":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M11.3284 13.1717C11.1087 12.952 10.8107 12.8286 10.5001 12.8286C10.1894 12.8286 9.89141 12.952 9.67172 13.1717C9.45203 13.3914 9.32861 13.6893 9.32861 14C9.32861 14.3107 9.45203 14.6086 9.67172 14.8283L13.1717 18.3283C13.2807 18.4365 13.41 18.522 13.5522 18.5801C13.6943 18.6381 13.8465 18.6676 14.0001 18.6667C14.1598 18.6616 14.3167 18.6238 14.4612 18.5555C14.6057 18.4873 14.7347 18.3901 14.8401 18.27L23.0067 8.93667C23.1953 8.70255 23.2862 8.40468 23.2605 8.10516C23.2348 7.80565 23.0945 7.52761 22.8689 7.32901C22.6432 7.13042 22.3496 7.0266 22.0492 7.0392C21.7489 7.05181 21.465 7.17986 21.2567 7.39667L14.0001 15.7967L11.3284 13.1717Z" fill="#5377A8" />
                    <path d="M24.5001 12.8333C24.1907 12.8333 23.8939 12.9563 23.6751 13.1751C23.4564 13.3938 23.3334 13.6906 23.3334 14C23.3334 16.4754 22.3501 18.8493 20.5998 20.5997C18.8494 22.35 16.4755 23.3333 14.0001 23.3333C12.1569 23.3325 10.3552 22.7859 8.82216 21.7625C7.28916 20.739 6.09352 19.2846 5.386 17.5826C4.67849 15.8805 4.49078 14.0071 4.84654 12.1986C5.20231 10.39 6.08563 8.72724 7.38511 7.42001C8.24926 6.54429 9.2794 5.84973 10.4152 5.37696C11.5511 4.90419 12.7698 4.66272 14.0001 4.66668C14.7461 4.67135 15.4894 4.75741 16.2168 4.92334C16.369 4.97042 16.5292 4.98583 16.6876 4.96861C16.846 4.95139 16.9992 4.90191 17.1377 4.82322C17.2763 4.74453 17.3972 4.63829 17.4931 4.51107C17.589 4.38384 17.6579 4.23832 17.6954 4.08348C17.7329 3.92863 17.7383 3.76774 17.7113 3.61073C17.6842 3.45371 17.6253 3.3039 17.5381 3.17053C17.451 3.03716 17.3374 2.92306 17.2045 2.83526C17.0715 2.74745 16.922 2.68781 16.7651 2.66001C15.8588 2.44679 14.9312 2.3372 14.0001 2.33334C11.6952 2.34532 9.44543 3.03978 7.53479 4.3291C5.62415 5.61842 4.13824 7.44482 3.26458 9.5778C2.39092 11.7108 2.16866 14.0548 2.62585 16.3139C3.08304 18.5731 4.19919 20.6462 5.83344 22.2717C7.99958 24.4388 10.936 25.6595 14.0001 25.6667C17.0943 25.6667 20.0618 24.4375 22.2497 22.2496C24.4376 20.0617 25.6668 17.0942 25.6668 14C25.6668 13.6906 25.5439 13.3938 25.3251 13.1751C25.1063 12.9563 24.8095 12.8333 24.5001 12.8333Z" fill="#5377A8" />
                </svg>
            )

        case "wrong":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 2.33334C11.6925 2.33334 9.43691 3.01758 7.51833 4.29953C5.59976 5.58148 4.10441 7.40356 3.22139 9.53537C2.33837 11.6672 2.10733 14.013 2.55749 16.2761C3.00765 18.5392 4.11879 20.618 5.75041 22.2496C7.38202 23.8812 9.46082 24.9923 11.7239 25.4425C13.987 25.8927 16.3328 25.6616 18.4646 24.7786C20.5964 23.8956 22.4185 22.4002 23.7005 20.4817C24.9824 18.5631 25.6667 16.3075 25.6667 14C25.6667 12.4679 25.3649 10.9508 24.7786 9.53537C24.1923 8.1199 23.3329 6.83378 22.2496 5.75043C21.1662 4.66708 19.8801 3.80772 18.4646 3.22142C17.0492 2.63511 15.5321 2.33334 14 2.33334ZM14 23.3333C12.154 23.3333 10.3495 22.786 8.81466 21.7604C7.2798 20.7348 6.08353 19.2772 5.37711 17.5717C4.67069 15.8663 4.48586 13.9897 4.84599 12.1792C5.20612 10.3687 6.09503 8.70564 7.40032 7.40035C8.70561 6.09506 10.3687 5.20614 12.1791 4.84601C13.9896 4.48589 15.8663 4.67072 17.5717 5.37713C19.2771 6.08355 20.7348 7.27983 21.7604 8.81469C22.7859 10.3495 23.3333 12.1541 23.3333 14C23.3333 16.4754 22.35 18.8493 20.5996 20.5997C18.8493 22.35 16.4753 23.3333 14 23.3333Z" fill="#A63A3A" />
                    <path d="M17.1618 10.8384C17.0534 10.729 16.9243 10.6422 16.7822 10.583C16.64 10.5238 16.4875 10.4933 16.3335 10.4933C16.1795 10.4933 16.027 10.5238 15.8848 10.583C15.7427 10.6422 15.6136 10.729 15.5052 10.8384L14.0002 12.355L12.4952 10.8384C12.2755 10.6187 11.9775 10.4952 11.6668 10.4952C11.3562 10.4952 11.0582 10.6187 10.8385 10.8384C10.6188 11.058 10.4954 11.356 10.4954 11.6667C10.4954 11.9774 10.6188 12.2753 10.8385 12.495L12.3552 14L10.8385 15.505C10.7292 15.6135 10.6424 15.7425 10.5831 15.8847C10.5239 16.0269 10.4934 16.1793 10.4934 16.3334C10.4934 16.4874 10.5239 16.6399 10.5831 16.782C10.6424 16.9242 10.7292 17.0532 10.8385 17.1617C10.947 17.271 11.076 17.3578 11.2182 17.4171C11.3603 17.4763 11.5128 17.5068 11.6668 17.5068C11.8209 17.5068 11.9733 17.4763 12.1155 17.4171C12.2577 17.3578 12.3867 17.271 12.4952 17.1617L14.0002 15.645L15.5052 17.1617C15.6136 17.271 15.7427 17.3578 15.8848 17.4171C16.027 17.4763 16.1795 17.5068 16.3335 17.5068C16.4875 17.5068 16.64 17.4763 16.7822 17.4171C16.9243 17.3578 17.0534 17.271 17.1618 17.1617C17.2712 17.0532 17.358 16.9242 17.4172 16.782C17.4764 16.6399 17.5069 16.4874 17.5069 16.3334C17.5069 16.1793 17.4764 16.0269 17.4172 15.8847C17.358 15.7425 17.2712 15.6135 17.1618 15.505L15.6452 14L17.1618 12.495C17.2712 12.3866 17.358 12.2575 17.4172 12.1154C17.4764 11.9732 17.5069 11.8207 17.5069 11.6667C17.5069 11.5127 17.4764 11.3602 17.4172 11.218C17.358 11.0758 17.2712 10.9468 17.1618 10.8384Z" fill="#A63A3A" />
                </svg>
            )
        case "back":
            return (
                <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
                    <path d="M10 2L2 10L10 18" stroke="#333333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        default:
            break;
    }
}