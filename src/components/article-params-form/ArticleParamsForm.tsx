import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onApply: (nextState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleOutsideMouseDown = (event: MouseEvent) => {
			const { target } = event;

			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onToggle();
			}
		};

		window.addEventListener('mousedown', handleOutsideMouseDown);

		return () => {
			window.removeEventListener('mousedown', handleOutsideMouseDown);
		};
	}, [isOpen, onToggle]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						placeholder='Выберите шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState((currentState) => ({
								...currentState,
								fontFamilyOption: option,
							}))
						}
					/>
					<Select
						title='Цвет текста'
						placeholder='Выберите цвет'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState((currentState) => ({
								...currentState,
								fontColor: option,
							}))
						}
					/>
					<Select
						title='Фон'
						placeholder='Выберите цвет'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState((currentState) => ({
								...currentState,
								backgroundColor: option,
							}))
						}
					/>
					<Select
						title='Ширина контента'
						placeholder='Выберите ширину'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState((currentState) => ({
								...currentState,
								contentWidth: option,
							}))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState((currentState) => ({
								...currentState,
								fontSizeOption: option,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
