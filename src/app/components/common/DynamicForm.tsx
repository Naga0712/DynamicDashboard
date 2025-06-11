import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../form/input/InputField";
import Switch from "../form/switch/Switch";
import { t } from "i18next";
import Select from "../form/Select";

interface DynamicField {
    name: string;
    label: string;
    dataType: any;
    value?: string | boolean;
    options?: { label: string; value: string }[];
}

interface DynamicFormProps {
    fields: DynamicField[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
    const defaultValues = fields.reduce((acc, field) => {
        acc[field.name] = field.value ?? (field.dataType === "boolean" ? false : "");
        return acc;
    }, {} as Record<string, any>);

    const { control, handleSubmit } = useForm({
        defaultValues,
    });

    const onSubmit = (data: Record<string, any>) => {
        console.log("Form Data:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => {
                if (!["text", "boolean", "dropdown"].includes(field.dataType)) {
                    console.warn(`Unsupported field type: ${field.dataType}`);
                    return null; // Skip rendering instead of using Controller
                }

                return (
                    <Controller
                        key={field.name}
                        name={field.name}
                        control={control}
                        render={({ field: controllerField }) => {
                            switch (field.dataType) {
                                case "text":
                                    return (
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium">{t(field.label)}</label>
                                            <Input
                                                type="text"
                                                placeholder={t(field.label)?.toString()}
                                                value={controllerField.value as string}
                                                onChange={(e) => controllerField.onChange(e.target.value)}
                                            />
                                        </div>
                                    );
                                case "boolean":
                                    return (
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium">{t(field.label)}</label>
                                            <Switch
                                                label=""
                                                defaultChecked={Boolean(controllerField.value)}
                                                onChange={(checked) => controllerField.onChange(checked)}
                                            />
                                        </div>
                                    );
                                case "dropdown":
                                    return (
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium">{t(field.label)}</label>
                                            <Select
                                                options={field.options || []}
                                                defaultValue={controllerField.value}
                                                onChange={controllerField.onChange}
                                            />
                                        </div>
                                    );
                                default:
                                    return <div />; // This avoids null, satisfies the ReactElement type
                            }
                        }}
                    />
                );
            })}

            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Submit
            </button>
        </form>
    );
};

export default DynamicForm;
