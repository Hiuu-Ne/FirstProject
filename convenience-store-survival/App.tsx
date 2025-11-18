import React,{useState} from 'react';
import {SelectedItem} from './types';
import {calculateSurvival,calculateNutrition} from './utils';
import {ITEMS} from './constants';
type Screen='start'|'result';
const App:React.FC=()=>{
const[screen,setScreen]=useState<Screen>('start');
const[result,setResult]=useState<any>(null);
const start=()=>{
const items=[{item:ITEMS[0],quantity:10},{item:ITEMS[6],quantity:5}];
const r=calculateSurvival(items);
setResult({...r,nutrition:calculateNutrition(items),items});
setScreen('result');
};
return(<div className="min-h-screen flex items-center justify-center p-4">
{screen==='start'&&<div className="text-center"><h1 className="text-5xl font-black mb-8">🏪 편의점 생존 시뮬레이터</h1><button onClick={start} className="bg-green-500 px-12 py-6 rounded-full text-2xl font-black">시작하기</button></div>}
{screen==='result'&&result&&<div className="max-w-4xl"><h1 className="text-center text-5xl font-black mb-4">{result.grade}</h1><div className="text-center text-8xl font-black mb-4">{result.finalDays.toFixed(1)}일</div><p className="text-center text-xl mb-4">{result.evaluation}</p><div className="bg-white/10 rounded-2xl p-8 mb-6"><h2 className="text-2xl font-bold mb-4">영양 분석</h2><p>칼로리: {result.nutrition.totalCalories}kcal</p><p>단백질: {result.nutrition.totalProtein}g</p><p>나트륨: {result.nutrition.totalSodium}mg</p></div><button onClick={()=>setScreen('start')} className="mx-auto block bg-purple-500 px-8 py-4 rounded-2xl font-bold">다시하기</button></div>}
</div>);
};
export default App;
