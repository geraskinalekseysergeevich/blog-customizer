import { useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isParamsOpen, setIsParamsOpen] = useState(false);
	const [appliedArticleState, setAppliedArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleToggleParams = () => {
		setIsParamsOpen((currentValue) => !currentValue);
	};

	const handleApply = (nextState: ArticleStateType) => {
		setAppliedArticleState(nextState);
		setIsParamsOpen(false);
	};

	const handleReset = () => {
		setAppliedArticleState(defaultArticleState);
		setIsParamsOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedArticleState.fontFamilyOption.value,
					'--font-size': appliedArticleState.fontSizeOption.value,
					'--font-color': appliedArticleState.fontColor.value,
					'--container-width': appliedArticleState.contentWidth.value,
					'--bg-color': appliedArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isParamsOpen}
				onToggle={handleToggleParams}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
