import React from 'react';

const CardFooter = ({ isDisabled, onCancel, onSave }) => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-[#1B75BB] p-2">
            <div className="flex justify-end space-x-4 font-semibold">
                <button
                    type="button"
                    disabled={isDisabled}
                    onClick={onCancel}
                    className={`btn flex items-center rounded-md border-2 border-red-500 text-red-500 p-1 ${!isDisabled ? "bg-white hover:bg-red-500 hover:text-white hover:shadow-xl" : "bg-gray-300"}`}
                >
                    <i className={`fa fa-ban mr-1`} aria-hidden="true"></i>
                    Cancel
                </button>
                <button
                    type="button"
                    disabled={isDisabled}
                    onClick={onSave}
                    className={`btn flex items-center rounded-md border-2 border-[#1B75BB] bg-white text-[#1B75BB] p-1 ${!isDisabled ? `bg-white hover:bg-[#1B75BB] hover:text-white hover:shadow-xl` : "bg-gray-300"}`}
                >
                    <i className={`fa fa-save mr-1`} aria-hidden="true"></i>
                    Save Changes
                </button>
            </div>
        </footer>
    );
};

export default CardFooter;
