import { useEffect } from 'react';
import type { RefObject } from 'react';

type UseCloseOnOutsideClickOrEscProps = {
	isOpenElement: boolean;
	elementRef: RefObject<HTMLElement>;
	onClose?: () => void;
};

export const useCloseOnOutsideClickOrEsc = ({
	isOpenElement,
	elementRef,
	onClose,
}: UseCloseOnOutsideClickOrEscProps) => {
	useEffect(() => {
		if (!isOpenElement) {
			return;
		}

		const handleMouseDown = (event: MouseEvent) => {
			const { target } = event;

			if (target instanceof Node && !elementRef.current?.contains(target)) {
				onClose?.();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [elementRef, isOpenElement, onClose]);
};
