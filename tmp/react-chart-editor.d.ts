declare module 'react-chart-editor' {
	import React, { Component, ReactNode } from 'react';
	export interface PlotlyEditorProps {
		/** Toggle on/off advanced trace type selection */
		advancedTraceTypeSelector?: boolean;
		chartHelp?: Record<string, unknown>;
		/** React children elements */
		children?: ReactNode;
		/** Config Record<string, unknown> (see https://plot.ly/javascript/configuration-options/) */
		config: Record<string, unknown>;
		customConfig?: Record<string, unknown>;
		/** List of trace Record<string, unknown>s (see https://plot.ly/javascript/reference/); defaulted to `[]` (state Record<string, unknown>) */
		data?: any[];
		dataSourceOptions?: any[];
		dataSources?: Record<string, unknown>;
		debug?: boolean;
		dictionaries?: Record<string, unknown>;
		divId?: string;
		fontOptions?: any[];
		/** List of frame Record<string, unknown>s (see https://plot.ly/javascript/reference/) */
		frames?: any[];
		/** Whether or not to use WebGL capability */
		glByDefault?: boolean;
		hideControls?: boolean;
		/** Layout Record<string, unknown> (see https://plot.ly/javascript/reference/#layout) */
		layout?: Record<string, unknown>;
		locale?: string;
		makeDefaultTrace?: (...args: any[]) => void;
		/** Callback when the component is updated */
		onUpdate?: (data: any[], layout: Record<string, unknown>, frames: any[]) => void;
		onRender?: (...args: any[]) => void;
		/** Plotly module from plotly.js default export */
		plotly: Record<string, unknown>;
		showFieldTooltips?: boolean;
		srcConverters?: any;
		traceTypesConfig?: Record<string, unknown>;
		useResizeHandler?: boolean;
	}
	/** **Warning**: for the time being; this component may mutate its layout and data props in response to user input; going against React rules. This behaviour will change in the near future once https://github.com/plotly/plotly.js/issues/2389 is completed.
	 *
	 * For more information; please see https://github.com/plotly/react-chart-editor#overview
	 */
	export class PlotlyEditor extends Component<PlotlyEditorProps> {}
	export default PlotlyEditor;

	/**
	==================================================================
							Components
	==================================================================
	*/
	export interface PanelMenuWrapperProps {
		/** React children elements */
		children?: ReactNode;
		/** Order of the menu panels */
		menuPanelOrder?: string[];
	}
	export class PanelMenuWrapper extends React.Component<PanelMenuWrapperProps> {}
	/**
	======================
			Containers
	======================
	*/
	export interface AnnotationAccordionProps {
		children?: ReactNode;
		canAdd?: boolean;
		canReorder?: boolean;
	}
	export class AnnotationAccordion extends Component<AnnotationAccordionProps> {}

	export interface AxesFoldProps {
		children?: ReactNode;
		options?: any[];
	}
	export class AxesFold extends Component<AxesFoldProps> {}

	export interface FoldEmptyProps {
		messagePrimary?: string;
		messageSecondary?: string;
		children?: ReactNode;
		icon?: ReactNode;
	}
	export class FoldEmpty extends Component<FoldEmptyProps> {}

	export interface ImageAccordionProps {
		children?: ReactNode;
		canAdd?: boolean;
		canReorder?: boolean;
	}
	export class ImageAccordion extends Component<ImageAccordionProps> {}

	export interface MapboxLayersAccordionProps {
		children?: ReactNode;
	}
	export class MapboxLayersAccordion extends Component<MapboxLayersAccordionProps> {}

	export interface MenuPanelProps {
		children?: ReactNode;
		icon?: ReactNode;
		label?: string;
		ownline?: boolean;
		question?: boolean;
		show?: boolean;
	}
	export class MenuPanel extends Component<MenuPanelProps> {}

	export interface ModalProps {
		children: ReactNode;
		title?: ReactNode;
	}
	export class Modal extends Component<ModalProps> {}

	export interface ModalBoxProps {
		backgroundDark?: boolean;
		relative?: boolean;
		children?: ReactNode;
		onClose?: Function;
	}
	export class ModalBox extends Component<ModalBoxProps> {}

	export interface ModalProviderProps {
		children?: ReactNode;
	}
	export class ModalProvider extends Component<ModalProviderProps> {}

	export interface PanelEmptyProps {
		heading?: string;
		children?: ReactNode;
		icon?: ReactNode;
	}
	export class PanelEmpty extends Component<PanelEmptyProps> {}

	export interface PanelHeaderProps {
		addAction?: Record<string, any>;
		allowCollapse?: boolean;
		children?: ReactNode;
		hasOpen?: boolean;
		toggleFolds?: Function;
	}
	export class PanelHeader extends Component<PanelHeaderProps> {}

	export interface PlotlyFoldProps {
		/** Whether or not the data can be deleted */
		canDelete?: boolean;
		/** React children elements */
		children?: ReactNode;
		/** Override to CSS classnames */
		className?: string;
		/** Whether or not the fold is open/closed */
		folded?: boolean;
		/** Metadata for the fold */
		foldInfo?: Record<string, any>;
		/** Callback when the fold is toggled open/closed */
		toggleFold?: (...args: any[]) => void;
		/** Hide the header of the folder */
		hideHeader?: boolean;
		/** Icon to place on header */
		icon?: ReactNode;
		/** Override for empty content */
		messageIfEmpty?: string;
		/** Name attribute of DOM element */
		name: string;
		/** Whether or not the fold can move up the DOM tree */
		canMoveUp?: boolean;
		/** Whether or not the fold can move down the DOM tree */
		canMoveDown?: boolean;
	}
	export class PlotlyFold extends React.Component<PlotlyFoldProps> {}

	export interface PlotlyPanelProps {
		group?: string;
		name?: string;
		addAction?: Record<string, any>;
		children?: ReactNode;
		deleteAction?: Function;
		noPadding?: boolean;
		showExpandCollapse?: boolean;
		canReorder?: boolean;
	}
	export class PlotlyPanel extends Component<PlotlyPanelProps> {}

	export interface PlotlySectionProps {
		children?: ReactNode;
		name?: string;
		attr?: string;
	}
	export class PlotlySection extends Component<PlotlySectionProps> {}

	export interface RangeSelectorAccordionProps {
		children?: ReactNode;
	}
	export class RangeSelectorAccordion extends Component<RangeSelectorAccordionProps> {}

	export interface ShapeAccordionProps {
		children?: ReactNode;
		canAdd?: boolean;
		canReorder?: boolean;
	}
	export class ShapeAccordion extends Component<ShapeAccordionProps> {}

	export interface SingleSidebarItemProps {
		children?: ReactNode;
	}
	export class SingleSidebarItem extends Component<SingleSidebarItemProps> {}

	export interface SliderAccordionProps {
		children?: ReactNode;
	}
	export class SliderAccordion extends Component<SliderAccordionProps> {}

	export interface SubplotAccordionProps {
		children?: ReactNode;
	}
	export class SubplotAccordion extends Component<SubplotAccordionProps> {}

	export interface TraceAccordionProps extends PlotlyPanelProps {
		canAdd?: boolean;
		canGroup?: boolean;
		traceFilterCondition?: Function;
	}
	export class TraceAccordion extends Component<TraceAccordionProps> {}

	export interface TraceMarkerSectionProps {
		children?: ReactNode;
		name?: string;
	}
	export class TraceMarkerSection extends Component<TraceMarkerSectionProps> {}

	export interface TraceRequiredPanelProps {
		children?: ReactNode;
		/** Defaults to `true` */
		visible?: boolean;
	}
	export class TraceRequiredPanel extends Component<TraceRequiredPanelProps> {}

	export interface TransformAccordionProps {
		children?: ReactNode;
	}
	export class TransformAccordion extends Component<TransformAccordionProps> {}

	export interface UpdateMenuAccordionProps {
		children?: ReactNode;
	}
	export class UpdateMenuAccordion extends Component<UpdateMenuAccordionProps> {}

	/**
	 * Derived
	 */
	export type ContainerConnectedContextType = {
		localize?: Function;
		container?: Record<string, unknown>;
		data?: any[];
		defaultContainer?: Record<string, unknown>;
		fullContainer?: Record<string, unknown>;
		fullData?: any[];
		fullLayout?: Record<string, unknown>;
		getValObject?: Function;
		graphDiv?: Record<string, unknown>;
		layout?: Record<string, unknown>;
		onUpdate?: Function;
		plotly?: Record<string, unknown>;
		updateContainer?: Function;
		traceIndexes?: any[];
		customConfig?: Record<string, unknown>;
		hasValidCustomConfigVisibilityRules?: boolean;
	};
	export interface LayoutConnectedComponentProps {
		layout?: Record<string, unknown>;
		fullLayout?: Record<string, unknown>;
		plotly?: Record<string, unknown>;
		onUpdate?: Function;
		//contextTypes
		getValObject?: Function;
		updateContainer?: Function;
		container?: Record<string, unknown>;
		fullContainer?: Record<string, unknown>;
	}
	export class LayoutConnectedComponent extends Component<LayoutConnectedComponentProps> {}

	export class LayoutPanel extends Component<PlotlyPanelProps> {}
	export class LayoutSection extends Component<PlotlySectionProps> {}

	export interface TraceTypeSectionProps {
		children?: ReactNode;
		name?: string;
		traceTypes?: any[];
		mode?: string;
	}
	export class TraceTypeSection extends Component<TraceTypeSectionProps> {}

	/**
	======================
			Fields
	======================
	*/

	export interface FieldContextType {
		localize?: Function;
		description?: string;
		attr?: string;
		showFieldTooltips?: boolean;
		show?: boolean;
	}
	export interface FieldProps extends FieldContextType {
		labelWidth?: number;
		center?: boolean;
		label?: any;
		units?: string;
		multiValued?: boolean;
		suppressMultiValuedMessage?: boolean;
		children?: ReactNode;
		extraComponent?: any;
		fieldContainerClassName?: string;
		value?: any;
		onChange?: Function;
		className?: string;
	}
	export class Field extends Component<FieldProps> {}

	//eslint-disable-next-line
	export interface ArrowSelectorProps extends UnconnectedDropdownProps {}
	export class ArrowSelector extends Component<ArrowSelectorProps> {}

	export interface AxesCreatorProps {
		attr?: string;
		label?: string;
		options?: any[];
		container?: Record<string, any>;
		fullContainer?: Record<string, any>;
		updateContainer?: Function;
	}
	export class AxesCreator extends Component<AxesCreatorProps> {}

	export interface AxesSelectorProps {
		axesOptions?: any[];
	}
	export class AxesSelector extends Component<AxesSelectorProps> {}

	export interface AxisIntervalProps extends FieldProps {
		fullValue?: number | string;
		updatePlot?: Function;
		attr?: string;
		fullContainer?: Record<string, any>;
	}
	export class AxisInterval extends Component<AxisIntervalProps> {}

	export interface AxisRangeValueProps extends FieldProps {
		defaultValue?: any;
		fullValue?: any;
		min?: number;
		max?: number;
		multiValued?: boolean;
		hideArrows?: boolean;
		showSlider?: boolean;
		step?: number;
		fullContainer?: Record<string, any>;
		updatePlot?: Function;
	}
	export class AxisRangeValue extends Component<AxisRangeValueProps> {}

	export interface ColorArrayPickerProps extends FieldProps {
		fullValue?: any;
		updatePlot?: Function;
	}
	export class ColorArrayPicker extends Component<ColorArrayPickerProps> {}

	export interface ColorPickerProps extends FieldProps {
		fullValue?: any;
		updatePlot?: Function;
		handleEmpty?: boolean;
		defaultColor?: string;
	}
	export class ColorPicker extends Component<ColorPickerProps> {}

	export interface ColorscalePickerProps extends FieldProps {
		labelWidth?: number;
		fullValue?: any;
		fullContainer?: Record<string, any>;
		updatePlot?: Function;
		initialCategory?: string;
		colorscale: string[];
	}
	export class ColorscalePicker extends Component<ColorscalePickerProps> {}

	export interface ColorwayPickerProps extends FieldProps {
		fullValue?: any;
		updatePlot?: Function;
		disableCategorySwitch?: boolean;
	}
	export class ColorwayPicker extends Component<ColorwayPickerProps> {}

	export interface DataSelectorProps extends FieldProps {
		fullValue?: any;
		updatePlot?: Function;
		container?: Record<string, any>;
	}
	export class DataSelector extends Component<DataSelectorProps> {}

	export interface DateTimePickerProps extends FieldProps {
		fullValue?: string;
		updatePlot?: Function;
		placeholder?: string;
	}
	export class DateTimePicker extends Component<DateTimePickerProps> {}

	export interface UnconnectedDropdownProps extends FieldProps {
		backgroundDark?: boolean;
		components?: Record<string, any>;
		clearable?: boolean;
		fullValue?: any;
		searchable?: boolean;
		options: any[];
		updatePlot?: Function;
		disabled?: boolean;
		placeholder?: any;
		className?: string;
		defaultOpt?: string | number | boolean;
	}
	export class Dropdown extends Component<UnconnectedDropdownProps> {}

	export interface DropdownCustomProps extends FieldProps {
		backgroundDark?: boolean;
		fullValue?: any;
		updatePlot?: Function;
		clearable?: boolean;
		components?: Record<string, any>;
		placeholder?: any;
		defaultOpt?: string | number | boolean;
		customOpt?: string | number | boolean;
		label?: string;
		attr?: string;
	}
	export class DropdownCustom extends Component<DropdownCustomProps> {}

	export interface DropzoneProps extends FieldProps {
		value?: any;
		onUpdate?: Function;
	}
	export class Dropzone extends Component<DropzoneProps> {}

	export interface DualNumericProps extends FieldProps {
		defaultValue?: any;
		fullValue?: any;
		min?: number;
		max?: number;
		multiValued?: boolean;
		hideArrows?: boolean;
		showSlider?: boolean;
		step?: number;
		updatePlot?: Function;
		attr2?: any;
		percentage?: boolean;
	}
	export class DualNumeric extends Component<DualNumericProps> {}

	export interface ErrorBarsProps {
		attr?: string;
		fullValue?: Record<string, any>;
		updatePlot?: Function;
	}
	export class ErrorBars extends Component<ErrorBarsProps> {}

	export interface FilterOperationProps extends FieldProps {
		defaultValue?: string;
		fullValue?: any;
		updatePlot?: Function;
	}
	export class FilterOperation extends Component<FilterOperationProps> {}

	export interface FlaglistProps extends FieldProps {
		fullValue?: any;
		options: any[];
		updatePlot?: Function;
	}
	export class Flaglist extends Component<FlaglistProps> {}

	//eslint-disable-next-line
	export interface FontSelectorProps extends UnconnectedDropdownProps {}
	export class FontSelector extends Component<FontSelectorProps> {}

	export interface GroupCreatorProps extends FieldProps {
		attr?: string;
		fullContainer?: Record<string, any>;
		prefix?: string;
	}
	export class GroupCreator extends Component<GroupCreatorProps> {}

	export interface HoverLabelNameLengthProps extends FieldProps {
		fullValue?: number;
		updatePlot?: Function;
	}
	export class HoverLabelNameLength extends Component<HoverLabelNameLengthProps> {}

	//eslint-disable-next-line
	export interface InfoProps extends FieldProps {}
	export class Info extends Component<InfoProps> {}

	export interface LineSelectorsProps extends UnconnectedDropdownProps {
		computeOptions?: Function;
	}
	export class LineSelectors extends Component<LineSelectorsProps> {}

	export interface LocationSelectorProps extends FieldProps {
		fullValue?: any;
		updatePlot?: Function;
		attr?: string;
	}
	export class LocationSelector extends Component<LocationSelectorProps> {}

	export interface MarkerColorProps extends FieldProps {
		fullValue?: any;
		updatePlot?: Function;
	}
	export class MarkerColor extends Component<MarkerColorProps> {}

	export interface MarkerSizeProps extends FieldProps {
		fullValue?: any;
		updatePlot?: Function;
	}
	export class MarkerSize extends Component<MarkerSizeProps> {}

	export interface MultiColorPickerProps extends FieldProps {
		multiColorMessage?: string;
		singleColorMessage?: string;
		updatePlot?: Function;
		attr?: string;
		parentSelectedConstantColorOption?: string;
		onConstantColorOptionChange?: Function;
		messageKeyWordSingle?: string;
		messageKeyWordPlural?: string;
		tracesToColor?: any[];
	}
	export class MultiColorPicker extends Component<MultiColorPickerProps> {}

	export interface NumericProps extends FieldProps {
		defaultValue?: any;
		fullValue?: any;
		min?: number;
		max?: number;
		multiValued?: boolean;
		hideArrows?: boolean;
		showSlider?: boolean;
		step?: number;
		stepmode?: string;
		updatePlot?: Function;
	}
	export class Numeric extends Component<NumericProps> {}

	export interface NumericOrDateProps extends FieldProps {
		defaultValue?: any;
		fullValue?: any;
		min?: number;
		max?: number;
		multiValued?: boolean;
		hideArrows?: boolean;
		showSlider?: boolean;
		step?: number;
		fullContainer?: Record<string, any>;
		updatePlot?: Function;
	}
	export class NumericOrDate extends Component<NumericOrDateProps> {}

	export interface PieColorscalePickerProps extends FieldProps {
		fullValue?: any;
		updatePlot?: Function;
	}
	export class PieColorscalePicker extends Component<PieColorscalePickerProps> {}

	export interface RadioProps extends FieldProps {
		center?: boolean;
		fullValue?: any;
		options: any[];
		updatePlot?: Function;
	}
	export class Radio extends Component<RadioProps> {}

	export interface RectanglePositionerProps extends FieldProps {
		fullValue?: any;
		updatePlot?: Function;
		cartesian?: boolean;
	}
	export class RectanglePositioner extends Component<RectanglePositionerProps> {}

	export interface SubplotCreatorProps {
		container?: Record<string, any>;
		fullContainer?: Record<string, any>;
	}
	export class SubplotCreator extends Component<SubplotCreatorProps> {}

	export interface SymbolSelectorProps extends FieldProps {
		defaultValue?: string;
		fullValue?: any;
		updatePlot?: Function;
	}
	export class SymbolSelector extends Component<SymbolSelectorProps> {}

	export interface TextProps extends FieldProps {
		defaultValue?: any;
		fullValue?: any;
		multiValued?: boolean;
		updatePlot?: Function;
		onChange?: Function;
	}
	export class Text extends Component<TextProps> {}

	export interface TextEditorProps extends FieldProps {
		fullValue?: any;
		htmlOnly?: boolean;
		latexOnly?: boolean;
		richTextOnly?: boolean;
		updatePlot?: Function;
		placeholder?: string;
	}
	export class TextEditor extends Component<TextEditorProps> {}

	export interface TextPositionProps extends FieldProps {
		options?: any[];
		fullValue: any[] | string;
	}
	export class TextPosition extends Component<TextPositionProps> {}

	export interface TraceSelectorProps {
		container: Record<string, any>;
		fullContainer: Record<string, any>;
		fullValue?: any;
		updateContainer?: Function;
	}
	export class TraceSelector extends Component<TraceSelectorProps> {}

	export interface UpdateMenuButtonsProps {
		attr?: string;
		fullValue?: any[];
		updatePlot?: Function;
	}
	export class UpdateMenuButtons extends Component<UpdateMenuButtonsProps> {}

	export interface VisibilitySelectProps extends FieldProps {
		fullValue?: any;
		updatePlot?: Function;
		dropdown?: boolean;
		clearable?: boolean;
		showOn?: boolean | number | string | any[];
		defaultOpt?: string | number | boolean;
		label?: string;
		attr?: string;
		options?: {
			label: string;
			value: any;
		}[];
	}
	export class VisibilitySelect extends Component<VisibilitySelectProps> {}

	/**
	======================
			Sidebar
	======================
	*/
	export interface SidebarGroupProps {
		group?: string;
		onChangeGroup?: Function;
		panels?: any[];
		selectedGroup?: string;
		selectedPanel?: string;
	}
	export class SidebarGroup extends Component<SidebarGroupProps> {}

	export interface SidebarItemProps {
		active?: boolean;
		label?: string;
		onClick?: Function;
	}
	export class SidebarItem extends Component<SidebarItemProps> {}

	/**
	======================
			Widgets
	======================
	*/
	export interface ButtonProps {
		children?: ReactNode;
		className?: any;
		icon?: ReactNode;
		label?: any;
		variant?: string;
		onClick?: Function;
	}
	export class Button extends Component<ButtonProps> {}

	export interface CheckboxGroupProps {
		options: {
			label: string;
			value: string;
			checked: boolean;
		}[];
		onChange?: Function;
		className?: string;
		orientation?: string;
	}
	export class CheckboxGroup extends Component<CheckboxGroupProps> {}

	export interface ColorscalePickerProps {
		onColorscaleChange?: Function;
		selected?: any[];
		label?: string;
		initialCategory?: string;
		disableCategorySwitch?: boolean;
	}
	export class ColorscalePicker extends Component<ColorscalePickerProps> {}

	export interface DateTimePickerProps {
		value: string;
		onChange: Function;
	}
	export class DateTimePicker extends Component<DateTimePickerProps> {}

	export interface DropdownProps {
		backgroundDark?: boolean;
		clearable?: boolean;
		onChange: Function;
		options: any[];
		placeholder?: string | Record<string, any>;
		searchable?: boolean;
		minWidth?: string | number;
		valueKey?: string;
		value?: any;
		multi?: boolean;
		components?: Record<string, any>;
		noResultsText?: string;
		disabled?: boolean;
		className?: string;
		width?: string | number;
	}
	export class Dropdown extends Component<DropdownProps> {}

	export interface DropzoneProps {
		fileType: string;
		onUpdate?: Function;
		value?: any;
	}
	export class Dropzone extends Component<DropzoneProps> {}

	export interface EditableTextProps {
		/** Called with input value on changes (as the user types) */
		onChange?: Function;
		/** Called with input value on blur (and enter if no onEnter is given) */
		onUpdate?: Function;
		/** Called on input keyDown events */
		onKeyDown?: Function;
		onWheel?: Function;
		/** Input value property ... */
		text?: any;
		/** Input properties */
		placeholder?: string | number;
		className?: string;
		disable?: boolean;
		autoFocus?: boolean;
		/** Defaults to `false` */
		readOnly?: boolean;
		/** Defaults to `text` */
		type: 'text' | 'password';
		size?: number;
	}
	export class EditableText extends Component<EditableTextProps> {}

	export interface FlaglistCheckboxGroupProps {
		options: {
			value: any;
			label: string;
		}[];
		activeOption?: any;
		onChange?: Function;
		className?: string;
		orientation?: string;
	}
	export class FlaglistCheckboxGroup extends Component<FlaglistCheckboxGroupProps> {}

	export interface LogoProps {
		src?: string;
	}
	export class Logo extends Component<LogoProps> {}

	export interface NumericInputProps {
		defaultValue?: any;
		editableClassName?: string;
		integerOnly?: boolean;
		max?: number;
		min?: number;
		onUpdate: Function;
		placeholder?: string | number;
		showArrows?: boolean;
		showSlider?: boolean;
		step?: number;
		stepmode?: string;
		value?: any;
		units?: string;
	}
	export class NumericInput extends Component<NumericInputProps> {}

	export interface RadioBlocksProps {
		options: {
			value: string | boolean | number;
			label?: string;
			icon?: ReactNode;
			disabled?: boolean;
		}[];
		onOptionChange: Function;
		activeOption?: string | boolean | number;
		radioClassName?: string;
		alignment?: 'right' | 'left' | 'center';
	}
	export class RadioBlocks extends Component<RadioBlocksProps> {}

	export interface SymbolSelectorProps {
		backgroundDark?: boolean;
		markerColor?: string;
		borderColor?: string;
		value?: string;
		onChange?: Function;
		symbolOptions?: any[];
	}
	export class SymbolSelector extends Component<SymbolSelectorProps> {}

	export interface TextAreaProps {
		value: string;
		onChange: Function;
		placeholder: string;
		visibleRows?: number;
		areaWidth?: number;
		textareaClass?: string;
	}
	export class TextArea extends Component<TextAreaProps> {}

	export interface TextInputProps {
		defaultValue?: any;
		editableClassName?: string;
		onUpdate: Function;
		onChange?: Function;
		placeholder?: string;
		value?: any;
	}
	export class TextInput extends Component<TextInputProps> {}

	export interface TraceTypeSelectorProps {
		handleClick: Function;
		container?: Record<string, any>;
		traceTypesConfig: Record<string, any>;
	}
	export class TraceTypeSelector extends Component<TraceTypeSelectorProps> {}

	/**
	==================================================================
							Default Panels
	==================================================================
	*/

	export const GraphCreatePanel;
	export const GraphSubplotsPanel;
	export const GraphTransformsPanel;
	export class StyleAxesPanel extends Component<any> {}
	export const StyleColorbarsPanel;
	export const StyleImagesPanel;
	export const StyleLayoutPanel;
	export const StyleLegendPanel;
	export const StyleMapsPanel;
	export const StyleNotesPanel;
	export const StyleShapesPanel;
	export const StyleSlidersPanel;
	export const StyleTracesPanel;
	export const StyleUpdateMenusPanel;

	/**
	==================================================================
							Constants
	==================================================================
	*/
	export const baseClass;
	/*
	 * Control represents multiple settings (like for several axes)
	 * and the values are different.
	 *
	 * Because this is sometimes used in contexts where users can enter freeform
	 * strings, we include a non-printable character (ESC) so it's not something
	 * people could type.
	 */
	export const MULTI_VALUED;
	// how mixed values are represented in text inputs
	export const MULTI_VALUED_PLACEHOLDER;
	export const getMultiValueText: (key, _) => any;
	export const EDITOR_ACTIONS;
	export const DEFAULT_FONTS;
	export const RETURN_KEY;
	export const ESCAPE_KEY;
	export const COMMAND_KEY;
	export const CONTROL_KEY;
	// matches gd._fullLayout._subplots categories except for xaxis & yaxis which
	// are in fact cartesian types
	export const TRACE_TO_AXIS;
	// Note: scene, and xaxis/yaxis were added for convenience sake even though they're not subplot types
	export const SUBPLOT_TO_ATTR;
	export const subplotName: (
		type,
		_
	) => {
		x: string;
		y: string;
		ternary: string;
		gl3d: string;
		scene: string;
		geo: string;
		mapbox: string;
		polar: string;
	}[type];
	export const TRANSFORMS_LIST;
	export const TRANSFORMABLE_TRACES;
	export const TRACES_WITH_GL;
	export const DEFAULT_COLORS;
	export const traceHasColorbar: (trace: any, fullTrace: any) => any;

	export class HoverColor extends Component<any> {}
	export class HovermodeDropdown extends Component<any> {}
}
